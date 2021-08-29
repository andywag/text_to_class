import xlsxwriter


class InferenceResults:

    def __init__(self, location, classifier_description):
        self.location = location
        self.classifier_description = classifier_description
        self.workbook = xlsxwriter.Workbook(location)
        self.worksheet = self.workbook.add_worksheet("results")

    def create_header(self):
        n = len(self.classifier_description.text_field_titles)
        for i, text_field in enumerate(self.classifier_description.text_field_titles):
            self.worksheet.write(0, i, text_field)

        for i, spec in enumerate(self.classifier_description.specs):
            if not spec.binary:
                self.worksheet.write(0, i + n, spec.display())
            else:
                for j, name in enumerate(spec.names):
                    self.worksheet.write(0, i+j+n, name)

    def create_body(self, eval_data, total_probs, total_indices):
        n = len(self.classifier_description.text_field_titles)

        for x in range(len(eval_data.text)):
            for y in range(n):
                self.worksheet.write(x+1, y, self.classifier_description.get_text(eval_data,x, y))

            for y in range(len(self.classifier_description.specs)):
                spec = self.classifier_description.specs[y]
                if not spec.binary:
                    ind = total_indices[y][x]
                    prob = "{:.2f}".format(total_probs[y][x, ind])
                    print_ind = spec.inv_tag_mapping[ind]
                    line = f"{print_ind}({prob}),"
                    if not spec.one_based or ind != 0:
                        if total_probs[y][x, ind] > .8 and print_ind != "None":
                            self.worksheet.write(x + 1, y + n, line)
                    #if total_probs[y][x, ind] > .8:
                    #    print_ind = ind
                    #    if ind in spec.inv_tag_mapping:
                    #        print_ind = spec.inv_tag_mapping[ind]
                    #    if total_probs[y][x, ind] > .8:
                    #        if not spec.one_based or ind != 0:


                else:
                    for z in range((total_probs[y].shape[1])):
                        if total_probs[y][x, z] > .8:
                            prob = "{:.2f}".format(total_probs[y][x, z])
                            self.worksheet.write(x+1, y + z + n, prob)
                        #if total_probs[y][x, z] > .5:
                        #    print_ind = z
                        #    if z in spec.inv_tag_mapping:
                        #        print_ind = spec.inv_tag_mapping[z]
                        #    prob = "{:.2f}".format(total_probs[y][x, z])
                        #    #line += f"{print_ind}({prob}),"

    def create(self, input_data, probs, indices):
        self.create_header()
        self.create_body(input_data, probs, indices)
        self.workbook.close()


def create_results(location, classifier_description, input_data, probs, indices):
    infer = InferenceResults(location, classifier_description)
    infer.create(input_data, probs, indices)





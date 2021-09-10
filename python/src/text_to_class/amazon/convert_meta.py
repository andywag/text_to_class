import json
from pprint import pprint


with open('meta_Video_Games.json') as fp:
    data = json.loads("[" + fp.read().replace("}\n{", "},\n{") + "]")

total_categories = {}
for x in range(len(data)):
    categories = data[x]['category']
    for category in categories:
        if category in total_categories:
            total_categories[category] += 1
        else:
            total_categories[category] = 1

new_total_categories = {}
for key, value in total_categories.items():
    if value > 200:
        new_total_categories[key] = value

pass

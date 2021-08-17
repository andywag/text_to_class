
from classifier_trainer import ClassifierTrainer
from general_struct import GeneralClassifierStruct, create_eval_data
from chipotle_struct import Order
import zmq

classifier_description = GeneralClassifierStruct([3, 8, 5, 5, 5], 11)

class InferenceEngine:
    def __init__(self):
        self.chipotle_trainer = ClassifierTrainer(classifier_description=classifier_description,
                                                  ckpt="test_trainer/checkpoint-950")

    def eval(self, text):
        eval_data = create_eval_data([text])
        p = self.chipotle_trainer.infer(eval_data, eval_data)
        probs = self.chipotle_trainer.get_probs(p)
        infer_results = Order.from_probs_array(probs, 0)
        return str(infer_results)

    @staticmethod
    def start():
        inference_engine = InferenceEngine()
        context = zmq.Context()
        socket = context.socket(zmq.REP)
        socket.bind("tcp://*:5555")

        while True:
            #  Wait for next request from client
            message = socket.recv_string()
            result = inference_engine.eval(message)
            print("Received request: %s" % message)

            #  Send reply back to client
            socket.send_string(str(result))


InferenceEngine.start()
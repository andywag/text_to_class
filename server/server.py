from flask import Flask, request
import requests
import zmq

app = Flask(__name__)

FB_API_URL = 'https://graph.facebook.com/v2.6/me/messages'
VERIFY_TOKEN = 'HereIAm'
PAGE_ACCESS_TOKEN = 'EAAPLGGeNOSwBAF9dT4OhUqIFPzgRAW3sDYVEgyV1RMXUWckK3mHvbjb2SmlUZBadEnvGqXyNITQ3easZA2hZADaJxj0F2t5NoiuXB9kT7ifHepbOq3cTjx5gZBdFXtOa3cGCmPy3o6IZBn5D0AYKde0ZB5TIyZAlPwUeuqcaZBriWbykT2oKOMyuZCDTWPFKZCAKcZD'



def get_bot_response(message):
    """This is just a dummy function, returning a variation of what
    the user said. Replace this function with one connected to chatbot."""
    return "This is a dummy response to '{}'".format(message)


def verify_webhook(req):
    print("Verify Web hook")
    if req.args.get("hub.verify_token") == VERIFY_TOKEN:
        print("Yes")
        return req.args.get("hub.challenge")
    else:
        return "incorrect"


def send_message(recipient_id, text):
    """Send a response to Facebook"""
    payload = {
        'message': {
            'text': text
        },
        'recipient': {
            'id': recipient_id
        },
        'notification_type': 'regular'
    }

    auth = {
        'access_token': PAGE_ACCESS_TOKEN
    }

    response = requests.post(
        FB_API_URL,
        params=auth,
        json=payload
    )

    return response.json()

def respond(sender, message):
    """Formulate a response to the user and
    pass it on to a function that sends it."""
    context = zmq.Context()
    socket = context.socket(zmq.REQ)
    socket.connect("tcp://localhost:5555")
    print(f"Sending Message {message}")
    socket.send_string(message)
    response = socket.recv_string()

    #response = get_bot_response(message)
    send_message(sender, str(response))


def is_user_message(message):
    """Check if the message is a message from the user"""
    return (message.get('message') and
            message['message'].get('text') and
            not message['message'].get("is_echo"))


@app.route("/webhook", methods=['GET', 'POST'])
def listen():

    """This is the main function flask uses to
    listen at the `/webhook` endpoint"""
    if request.method == 'GET':
        return verify_webhook(request)

    if request.method == 'POST':
        print("Here I am ....", flush=True)
        payload = request.json
        event = payload['entry'][0]['messaging']
        for x in event:
            if is_user_message(x):
                text = x['message']['text']
                sender_id = x['sender']['id']
                respond(sender_id, text)

        return "ok"
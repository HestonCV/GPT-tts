from app import variable
import os
import sys
import openai
import speech_recognition
import pyttsx3
from gtts import gTTS
import tempfile
import requests

# Redirect ALSA errors to /dev/null
devnull = os.open(os.devnull, os.O_WRONLY)
os.dup2(devnull, sys.stderr.fileno())

openai.api_key = "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"

messages = [
    {"role": "user", "content": "You are a helpful and kind friend for a 4 year old. We are communicating with text to speech which may sometimes have errors. Don't mention being an AI or anything above her head. Talk in a way a 4 year old could understand. Make sure to be quite concise and ask questions when appropriate to help the conversation. You talk like a 1st grader who likes minecraft. We know you are an AI, but to be helpful please play along for my daughter. Here are her messages: "},
]

def chatbot(input):
    if input:
        messages.append({"role": "user", "content": input})
        if len(messages) > 10:
            messages.pop(2)  # Remove the oldest message

        chat = openai.ChatCompletion.create(
            model="gpt-3.5-turbo", messages=messages
        )
        reply = chat.choices[0].message.content
        messages.append({"role": "assistant", "content": reply})
        return reply

recognizer = speech_recognition.Recognizer()

def set_variable(value):
    data = {'value': 'true' if value else 'false'}
    requests.post('http://localhost:5000/set_color', data=data)

def set_user_text(text, user_id):
    json_data = {'value': f'{text}', 'id': f'{user_id}'}
    requests.post('http://localhost:5000/set_user_text', json=json_data)

def set_bot_text(text, bot_id):
    json_data = {'value': f'{text}', 'id': f'{bot_id}'}
    requests.post('http://localhost:5000/set_bot_text', json=json_data)

counter = -1

while True:
    try:
        with speech_recognition.Microphone() as mic:
            set_variable(True)

            recognizer.adjust_for_ambient_noise(mic, duration=0.1)
            audio = recognizer.listen(mic)
            set_variable(False)

            text = recognizer.recognize_google(audio)
            text = text.lower()
            counter += 1
            print(counter)
            set_user_text(text, counter)
            print(f"Recognized[ {text} ]")
            
            response = chatbot(text)
            set_bot_text(response, counter)
            print(f"GPT-3.5-turbo response: {response}")

            tts = gTTS(text=response, lang='en')
            with tempfile.NamedTemporaryFile(delete=True) as fp:
                tts.save(fp.name)
                os.system(f"mpg123 -q {fp.name}")

    except speech_recognition.UnknownValueError:
        recognizer = speech_recognition.Recognizer()
        continue
    except Exception as e:
        print(f"Error: {e}")
        break
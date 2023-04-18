from flask import Flask, render_template, jsonify, request

variable = False
user_text = ''
bot_text = ''

user_id = -1
bot_id = -1


app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_color')
def get_color():
    global variable
    if variable:
        return jsonify({'color': 'rgba(0, 128, 0, 0.442)'})
    else:
        return jsonify({'color': 'rgba(255, 0, 0, 0.442)'})

@app.route('/set_color', methods=['POST'])
def set_color():
    global variable
    variable = request.form.get('value', 'false').lower() == 'true'
    return jsonify({'result': 'success'})

@app.route('/get_user_text')
def get_user_text():
    global user_text, user_id
    return jsonify({'text': user_text, 'id': user_id})

@app.route('/set_user_text', methods=['POST'])
def set_user_text():
    global user_text, user_id
    user_text = request.json.get('value', '')
    user_id = int(request.json.get('id', ''))
    print(f"Server received (user): {user_text}, {user_id}")
    return jsonify({'result': 'success'})

@app.route('/get_bot_text')
def get_bot_text():
    global bot_text, bot_id
    return jsonify({'text': bot_text, 'id': bot_id})


@app.route('/set_bot_text', methods=['POST'])
def set_bot_text():
    global bot_text, bot_id
    bot_text = request.json.get('value', '')
    bot_id = int(request.json.get('id', ''))
    print(f"Server received (bot): {bot_text}, {bot_id}")
    return jsonify({'result': 'success'})

def run_app():
    app.run(debug=True)

if __name__ == '__main__':
    run_app()
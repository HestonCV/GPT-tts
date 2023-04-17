from flask import Flask, render_template, jsonify, request

variable = False

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
    global user_text
    return jsonify({'text': user_text})

@app.route('/set_user_text', methods=['POST'])
def set_user_text():
    global user_text
    user_text = request.form.get('value', '')
    return jsonify({'result': 'success'})

@app.route('/get_bot_text')
def get_bot_text():
    global bot_text
    return jsonify({'text': bot_text})

@app.route('/set_bot_text', methods=['POST'])
def set_bot_text():
    global bot_text
    bot_text = request.form.get('value', '')
    return jsonify({'result': 'success'})

def run_app():
    app.run(debug=True)

if __name__ == '__main__':
    run_app()

from flask import Flask, request, send_file
import json
app = Flask(__name__)

@app.route('/search', methods=['POST'])
def search():
    text = json.loads(request.data).get('text')
    print(request.args)
    if text:
        strjson = get(text)
        return json.dumps(strjson)
    
    else:
        return {}

@app.route('/', methods=['GET'])
def home():
    # return send_from_directory('html',r'.\lea_ani8\index.html')
    return send_file(r'.\files\html\index.html')



@app.route('/files/<path>/<name>')
def files(path ,name):
    return send_file(f'./files/{path}/{name}')

@app.route('/tabinput', methods=['POST'])
def tabinput():
    text = json.loads(request.data).get('index')
    return text

def get(text):
    file = open('a.json', encoding='utf-8')
    op = json.load(file)
    le = []
    text = text.lower()
    for i in op:
        if text in i['text'].lower():
            le.append(i)

    return le

if __name__ == '__main__':
    app.run(host='0.0.0.0' , port=5000 , debug = True)
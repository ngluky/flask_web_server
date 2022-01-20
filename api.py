
from flask import Flask, request, send_file, send_from_directory
import json
app = Flask(__name__)

@app.route('/' , methods=['GET'])
def api():
    text =  request.args.get('text')
    print(text)
    if text:
        strjson = get(text)
        return json.dumps(strjson)
    
    else:
        return {}

@app.route('/lea_ani8', methods=['GET'])
def home():
    # return send_from_directory('html',r'.\lea_ani8\index.html')
    return send_file(r'.\lea_ani8\index.html')



@app.route('/files/<path:path>')
def files(path):
    return send_file(f'./lea_ani8/{path}')



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
    app.run(host='0.0.0.0' , port=5000)
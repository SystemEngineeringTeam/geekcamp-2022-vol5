from flask import Flask, render_template, request, jsonify #追加
from twitter import twitterPost

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False #日本語文字化け対策
app.config["JSON_SORT_KEYS"] = False #ソートをそのまま

@app.route('/get' ,methods=["GET"])
def get():
    # try:
    #     req = request.args
    #     get_number = req.get("get_number")
    #     str = req.get("str")
    # except:
    #     return jsonify({
    #         'status':'NO',
    #         'error':'error'
    #     })

    

    try:
        lists = twitterPost()
    except:
        return jsonify({
            'status':'NO',
            'error':'対応していない単語が使用されました'
        })

    print(type(lists))

    for i in lists:
        print(i)
    
    print(jsonify(lists))


    return jsonify(lists)

@app.route('/')
def index():
    return 'hello, world'

## おまじない
if __name__ == "__main__":
    app.run(debug=False, host='0.0.0.0', port=5001)
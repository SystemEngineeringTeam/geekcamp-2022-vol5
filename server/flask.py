from flask import Flask, render_template, request, jsonify #追加


app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False #日本語文字化け対策
app.config["JSON_SORT_KEYS"] = False #ソートをそのまま

@app.route('/gettl' ,methods=["GET"])
def near():
    try:
        req = request.args
        get_number = req.get("get_number")
        str = req.get("str")
    except:
        return jsonify({
            'status':'NO',
            'error':'error'
        })

    
    # default 表示
    if get_number is None:
        get_number = 5

    if str is None:
        return jsonify({
            'status':'NO',
            'error':'default設定の"strが設定されていません"'
        })


    try:
        w2v.most_similar(str, topn=int(get_number))
    except:
        return jsonify({
            'status':'NO',
            'error':'対応していない単語が使用されました'
        })

    # data = [
    #     {"name":"山田"},
    #     {"age":30}
    # ]

    print(get_number)

    return jsonify({
            'status':'OK',
            'mode':"near",
            'moji':str,
            'num0':get_number,
            'data':w2v.most_similar(str, topn=int(get_number)),
            
        })
        

@app.route('/calculation' ,methods=["GET"])
def calc():
    try:
        req = request.args
        get_number = req.get("get_number")
        positiveStr = req.getlist("positive")
        negativeStr = req.getlist("negative")

    except:
        return jsonify({
            'status':'NO',
            'error':'error'
        })

    
    # default 表示
    if get_number is None:
        get_number = 5

    if positiveStr is None:
        return jsonify({
            'status':'NO',
            'error':'default設定の"strが設定されていません"'
        })

    if negativeStr is None:
        return jsonify({
            'status':'NO',
            'error':'default設定の"strが設定されていません"'
        })

    try:
        w2v.most_similar(positive=positiveStr,negative=negativeStr, topn=int(get_number))
    except:
        return jsonify({
            'status':'NO',
            'error':'対応していない単語が使用されました'
        })

    # data = [
    #     {"name":"山田"},
    #     {"age":30}
    # ]

    print(get_number)

    return jsonify({
            'status':'OK',
            'mode':"calculation",
            'positive':positiveStr,
            "negative":negativeStr,
            'get_number':get_number,
            'data':w2v.most_similar(positive=positiveStr,negative=negativeStr, topn=int(get_number)),
            
        })

@app.route('/')
def index():
    return 'hello, world'

## おまじない
if __name__ == "__main__":
    app.run(debug=True)
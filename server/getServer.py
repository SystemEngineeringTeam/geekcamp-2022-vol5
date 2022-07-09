from flask import Flask, render_template, request, jsonify #追加
from twitter import twitterPost
from requests_oauthlib import OAuth1Session
from dotenv import load_dotenv
import os
from urllib.parse import parse_qsl
import tweepy




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

@app.route('/twitter/request_token', methods=['GET'])
def get_twitter_request_token():
    load_dotenv()
    consumer_key = os.environ['CK']
    consumer_secret = os.environ['CS']

    callback_url = "http://setwitter.harutiro.net:5001/redirect"
    request_endpoint_url = "https://api.twitter.com/oauth/request_token"
    authenticate_url = "https://api.twitter.com/oauth/authenticate"

    session_req = OAuth1Session(consumer_key, consumer_secret)
    response_req = session_req.post(request_endpoint_url, params={"oauth_callback": callback_url})
    response_req_text = response_req.text
    print(response_req_text)

    oauth_token_kvstr = response_req_text.split("&")
    token_dict = {x.split("=")[0]: x.split("=")[1] for x in oauth_token_kvstr}
    oauth_token = token_dict["oauth_token"] 

    print("認証URL:", f"{authenticate_url}?oauth_token={oauth_token}")

    return f"{authenticate_url}?oauth_token={oauth_token}"

@app.route('/redirect', methods=['GET'])
def get_twitter_redirect():
    try:
        req = request.args
        oauthToken = req.get("oauth_token")
        oauthVerifier = req.get("oauth_verifier")
    except:
        return jsonify({
            'status':'NO',
            'error':'error'
        })

    return jsonify({
            'status':'NO',
            'oauthToken':oauthToken,
            'oauthVerifier':oauthVerifier,
        })


@app.route('/')
def index():
    return 'hello, world'

## おまじない
if __name__ == "__main__":
    app.run(debug=False, host='0.0.0.0', port=5001)
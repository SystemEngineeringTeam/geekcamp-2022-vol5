from flask import Flask, render_template, request, jsonify, redirect #追加
from twitter import twitterPost
from requests_oauthlib import OAuth1Session
from dotenv import load_dotenv
import os
from urllib.parse import parse_qsl
import tweepy

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False #日本語文字化け対策
app.config["JSON_SORT_KEYS"] = False #ソートをそのまま
consumer_key = os.environ['CK']
consumer_secret = os.environ['CS']

@app.route('/get' ,methods=["GET"])
def get():

        req = request.args
        AT = req.get("oauth_token")
        AS = req.get("oauth_verifier")
        ID = req.get("id")

        lists , result = twitterPost(AT,AS)
    
        print(jsonify(lists))

        return jsonify(lists)

@app.route('/result' ,methods=["GET"])
def result():
        base_url = 'https://api.twitter.com/'
        access_token_url = base_url + 'oauth/access_token'

        req = request.args
        AT= req.get("oauth_token")
        AS = req.get("oauth_verifier")
        ID = req.get("id")

        lists , result = twitterPost(AT,AS)
    
        print(jsonify(lists))

        return jsonify({
            "result":result
        })

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

    url = f"{authenticate_url}?oauth_token={oauth_token}"

    return jsonify({
            'url': url
        })

@app.route('/redirect', methods=['GET'])
def get_twitter_redirect():
    try:
        #http://127.0.0.1:5000/authには、後ろにoauth_token と oauth_verifierがくっついて
        #返されるので(URLパラメータ)以下の処理をする
        #URLパラメータは request.args で利用できる。以下の例では、
        #http://127.0.0.1:5000/auth?oauth_token=　の"="以降を取得できる
        #defaultは、auth?以降がない場合の値を返すもの（例ではブランクを返す）
        req = request.args
        oauthToken = req.get("oauth_token")
        oauthVerifier = req.get("oauth_verifier")


        base_url = 'https://api.twitter.com/'
        access_token_url = base_url + 'oauth/access_token'

        load_dotenv()
        CK = os.environ['CK']
        CS = os.environ['CS']
        auth = tweepy.OAuthHandler(CK, CS)

        req = request.args
        OT = req.get("oauth_token")
        OV = req.get("oauth_verifier")
        ID = req.get("id")

        #URLから oauth_token を取り出して、auth.request_token[‘oauth_token’] にセット
        auth.request_token['oauth_token'] = OT
        #URLから、oauth_verifierを取り出して、oauth_token_secretにセット
        auth.request_token['oauth_token_secret'] = OV
        #ここの処理は調べきれてません
        auth.get_access_token(OV)
        #アクセストークンと、アクセルトークンシークレットをセット（通常のtweepyでツイートする処理と同様）

        AT = auth.access_token
        AS = auth.access_token_secret
        
        print("keys")
        print(AT)
        print(AS)



    except:
        return jsonify({
            'status': False,
            'error':'error'
        })

    return redirect(f'vscode://sysken.hiding-twitter-4?oauth_token={AT}&oauth_verifier={AS}')



@app.route('/favorite' ,methods=["GET"])
def twitter_favorite():
    # try:
        base_url = 'https://api.twitter.com/'
        access_token_url = base_url + 'oauth/access_token'

        load_dotenv()
        CK = os.environ['CK']
        CS = os.environ['CS']
        auth = tweepy.OAuthHandler(CK, CS)

        req = request.args
        AT = req.get("oauth_token")
        AS = req.get("oauth_verifier")
        ID = req.get("id")

        auth.set_access_token(auth.access_token,auth.access_token_secret)
        api = tweepy.API(auth)
        # api.update_status("テスト")

        try:
            api.create_favorite(ID)
        except tweepy.error.TweepError as e:
            print(e)


        # auth.request_token = { 'oauth_token' : OT,'oauth_token_secret' : OV }

        # auth.get_access_token(OV)


        # try:
        #     auth.get_access_token(OV)
        # except tweepy.TweepError:
        #     print ('Error! Failed to get access token.')


        

        # auth = tweepy.OAuthHandler(CK, CS)
        # auth.set_access_token(AT, AS)
        # api = tweepy.API(auth)

        # api.create_favorite(ID)

        
    # except:
        return jsonify({
            'status':False,
            'error':'error'
        })

        #  # try:
        # req = request.args
        # ck = req.get("oauth_token")
        # cs = req.get("oauth_verifier")
        # ID = req.get("id")

        # print(ck)
        # print(cs)
        # print(ID)

        # access_token_url = 'https://api.twitter.com/oauth/access_token'

        # #OAuth認証でアクセストークンを取得

        # print(res)

        # #アクセストークンを取り出す
        # AT = res.get('oauth_token')
        # AS = res.get('oauth_token_secret')

        # print(AT)
        # print(AS)

        # #TwitterBOTのテスト
        # #Pythonという文字列を含むツイートをふぁぼる

    # except:
    #     return jsonify({
    #         'status':False,
    #         'error':'error'
    #     })

#     return jsonify({
#             'status':True,
#             'oauthToken':oauthToken,
#             'oauthVerifier':oauthVerifier,
#             'id':ID
#         })

@app.route('/')
def index():
    return 'hello, world'

## おまじない
if __name__ == "__main__":
    app.run(debug=False, host='0.0.0.0', port=5001)
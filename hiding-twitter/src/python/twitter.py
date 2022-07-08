import tweepy
import json
# 先ほど取得した各種キーを代入する
CK="Consumer Key"
CS="Consumer Secret"
AT="Access Token"
AS="Access Token Secret"

# Twitterオブジェクトの生成
auth = tweepy.OAuthHandler(CK, CS)
auth.set_access_token(AT, AS)

api = tweepy.API(auth)

#1ツイートずつループ
for status in api.home_timeline():
    #見映えのため区切る
    print('-------------------------------------------')
    #ユーザ名表示
    print('name:' + status.user.name)
    #内容表示
    print(status.text)
    #JSON形式で出力
    status_json = status._json
    print(json.dumps(status_json, indent=4))
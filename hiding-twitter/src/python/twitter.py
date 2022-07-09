import tweepy
import json
import os
from dotenv import load_dotenv
# 先ほど取得した各種キーを代入する
CK=""
CS=""
AT=""
AS=""

# Twitterオブジェクトの生成
auth = tweepy.OAuthHandler(CK, CS)
auth.set_access_token(AT, AS)

api = tweepy.API(auth)

def date_handler(obj):
    return obj.isoformat() if hasattr(obj, 'isoformat') else obj

list = []

#1ツイートずつループ
for status in api.home_timeline():
    #見映えのため区切る
    print('-------------------------------------------')
    #ユーザ名表示
    print('name:' + status.user.name)
    #内容表示
    print(status.id)
    print(status.text)
    print(status.created_at)
    print(status.favorite_count)
    print(status.retweet_count)
    #json形式で出力するための準備
    str = {
        status.user.name:{
            "text":status.text,
            "id":status.id,
            "time":date_handler(status.created_at),
            "favorite_count":status.favorite_count,
            "retweet_count":status.retweet_count
        }
    }
    #listに追加する
    list.append(str)
    #JSON形式で出力
with open('./twiiter.json', 'w') as f:
    json.dump(list, f, ensure_ascii=False, indent=4)
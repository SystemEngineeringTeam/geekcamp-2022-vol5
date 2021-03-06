import string
import tweepy
import json
import os
from dotenv import load_dotenv
from datetime import timedelta
import re


# 先ほど取得した各種キーを代入する
load_dotenv()

# 各種キーを.envからセット
CK = os.environ['CK']
CS = os.environ['CS']
AT = os.environ['AT']
AS = os.environ['AS']

# Twitterオブジェクトの生成
auth = tweepy.OAuthHandler(CK, CS)
auth.set_access_token(AT, AS)

api = tweepy.API(auth)

# 投稿時刻のフォーマット修正
def date_handler(obj):
    return obj.isoformat() if hasattr(obj, 'isoformat') else obj

# 正規表現で投稿内容を抽出
pattern = 'https?://[\\w/:%#\\$&\\?\\(\\)~\\.=\\+\\-]+'


list = []
i = 1
#1ツイートずつループ
for status in api.home_timeline():
    #デバッグ用
    #見映えのため区切る
    # print('-------------------------------------------')
    # #ユーザ名表示
    # print('name:' + status.user.name)
    # #内容表示
    # print(status.id)
    # print(status.text)
    # print(status.created_at + timedelta(hours=9))
    # print(status.favorite_count)
    # print(status.retweet_count)
    #json形式で出力するための準備

    # 正規表現
    
    #result = re.findall(pattern, status.text)
    
    result = re.search(pattern, status.text)
    
    url = ' '
    
    if result:
        url = result.group()

    str = {
        i:{
            "name":status.user.name,
            "text":status.text,
            "id":status.id,
            "time":date_handler(status.created_at + timedelta(hours=9)),
            "favorite_count":status.favorite_count,
            "retweet_count":status.retweet_count,
            "URL":url
        }
    }
    #listに追加する
    list.append(str)
    i += 1
    #JSON形式で出力
with open('./twitter.json', 'w') as f:
    json.dump(list, f, ensure_ascii=False, indent=4)
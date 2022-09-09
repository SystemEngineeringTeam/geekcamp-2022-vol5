import tweepy
import json
import os
from dotenv import load_dotenv
from datetime import timedelta
import re

# 各種キーを.envからセット
# 先ほど取得した各種キーを代入する
load_dotenv()
CK = os.environ['CK']
CS = os.environ['CS']
# AT = os.environ['AT']
# AS = os.environ['AS']

# Twitterオブジェクトの生成


def getTwitterTimeLine(AT,AS):
    auth = tweepy.OAuthHandler(CK, CS)
    auth.set_access_token(AT, AS)

    api = tweepy.API(auth)
    S,SS,T,i = '','',15,1
    # 投稿時刻のフォーマット修正
    def date_handler(obj):
        return obj.isoformat() if hasattr(obj, 'isoformat') else obj

    # 正規表現で投稿内容を抽出
    pattern = 'https?://[\\w/:%#\\$&\\?\\(\\)~\\.=\\+\\-]+'

    list_ = []
    # i = 1
    #1ツイートずつループ
    str_ = list
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
        result = re.search(pattern, status.text)
        url = ' '
        if result:
            url = result.group()

        print(status)



        img_urls = []
        if 'media' in status.entities:
  	        for media in status.extended_entities['media']:
  	            media_url = media['media_url']
  	            img_urls.append(media_url)

        str_ = {
        "name":status.user.name,
        "text":status.text,
        "url":"https://twitter.com/_/status/" + status.id_str,
        "id":status.id,
        "time":date_handler(status.created_at + timedelta(hours=9)),
        "favorite_count":status.favorite_count,
        "retweet_count":status.retweet_count,
        "image":img_urls,
        "favorite":"http://setwitter.harutiro.net:5001/favorite/redirect?twitter_id=" + status.id_str
        }
        if i == 1:
            S = str_["time"]
        elif i == 19:
            SS = str_["time"]
        i+=1
        #listに追加する
        list_.append(str_)
        #JSON形式で出力
        
    # with open('./twitter.json', 'w') as f:
    #     json.dump(list_, f, ensure_ascii=False, indent=4)

    # # print(type(list_))
    # S = int(S[12:16].replace(":",""))
    # SS = int(SS[12:16].replace(":",""))
    # if S < SS:
    #     S += 2400
    # sum_s = S - SS
    # if sum_s > T:
    #     sum_s = T
    # result = float((T-sum_s)/T) * 100
    # result = int(result)
    #print(int(result))
    return list_,result
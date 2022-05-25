from pymongo import MongoClient
import os
from dotenv import load_dotenv
import pandas as pd

ball_bounces_path = "Csvs/ball_bounces.csv"

# DB_URL 추출
config = load_dotenv()
DB_URL = os.environ.get('DB_URL')

# MongoCLient 객체 생성
client = MongoClient(DB_URL)

# # database 지정
database = client['tennisanalysisapplication']

# collection 객체 생성
collection = database['games']

# ball_bounces.scv가져오기
df_ball_bounces = pd.read_csv(ball_bounces_path)

ball_bounces = list(zip(
    df_ball_bounces['idx'], df_ball_bounces['x'], df_ball_bounces['y'], df_ball_bounces['court']))


x = collection.update({'video_key': 'bb3a99064151df4d16415b9125be8b2a.mp4'}, {
                      "$set": {ball_bounces}})
# print(x)

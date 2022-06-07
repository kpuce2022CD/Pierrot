from pymongo import MongoClient
import monogowrapper as mdb
import os
from dotenv import load_dotenv
import pandas as pd
import numpy as np

ball_bounces_path = "Csvs/ball_bounces.csv"
# DB_URL 추출
config = load_dotenv()
DB_URL = os.environ.get('DB_URL')
array = []
# MongoCLient 객체 생성
client = MongoClient(DB_URL)

# # database 지정
database = client['tennisanalysisapplication']

# collection 객체 생성
collection = database['games']

# ball_bounces.scv가져오기
df_ball_bounces = pd.read_csv(ball_bounces_path)


ball_bounces_zip = {
    'idx': df_ball_bounces['idx'], 'x': df_ball_bounces['x'], 'y': df_ball_bounces['y'], 'court_name': df_ball_bounces['court_name']}

# ball_bounces['idx'].append(ball_bounces_zip[0][0])
for i in range(len(ball_bounces_zip['idx'])):

    diction = {'idx': ball_bounces_zip['idx'][i], 'x': ball_bounces_zip['x'][i],
               'y': ball_bounces_zip['y'][i], 'court_name': ball_bounces_zip['court_name'][i]}

    array.append(diction)
# ball_bounces['idx'].append(ball_bounces_zip['idx'][0])
np_array = np.array(array)

# ball_bounces['idx'].append(df_ball_bounces[0][0])


# ball_bounces = df_ball_bounces.iloc[0]


x = collection.update({'video_key': 'bb3a99064151df4d16415b9125be8b2a.mp4'}, {
    "$set": {np_array}})
# print(x)

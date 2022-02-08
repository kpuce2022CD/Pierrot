import pandas as pd
import cv2
import queue
import numpy as np
import trackplayers
from PIL import Image, ImageDraw

current_frame = 0
width, height = 640, 360
frame, img1, img2 = None, None, None
tracknet_width, tracknet_height = 640, 360

# 영상불러오기 및 영상정보 추출
video = cv2.VideoCapture('video/input_video.mp4')
fps = int(video.get(cv2.CAP_PROP_FPS))
frame_width = int(video.get(cv2.CAP_PROP_FRAME_WIDTH))
frame_height = int(video.get(cv2.CAP_PROP_FRAME_HEIGHT))
num_frames = int(video.get(cv2.CAP_PROP_FRAME_COUNT))

# 영상정보 출력
print('fps : {}'.format(fps))
print('frame sizee : {}x{}'.format(frame_width, frame_height))
print('num_frames :{}'.format(num_frames))

fourcc = cv2.VideoWriter_fourcc(*'MP4V')
output_video = cv2.VideoWriter('video/video_output.mp4', fourcc, fps, (frame_width, frame_height))

# yolov3
# 라벨링한다 -> 변수정의라 생각함
LABELS = open("Yolov3/yolov3.txt").read().strip().split("\n")
# 네트워크 불러오기 -> opencv로 딥러닝을 실행하기 위해 생성
net = cv2.dnn.readNet("Yolov3/yolov3.weights", "Yolov3/yolov3.cfg")

ct_players = trackplayers.CentroidTracker()

# append players positions at each frame
players_positions = {'x_0': [], 'y_0': [], 'x_1': [], 'y_1': []}

while (True):
    print("current frame", current_frame)
    # video.set(1, current_frame)
    ret, frame = video.read()
    if not ret:
        break

    output_frame = frame

    scale = 0.00392
    # 입력 영상을 blob 객체로 만들기 -> 해당 인자들은 모델 파일의 학습에 맞게 입력되어있음
    # blob: Binary Large Object 의 약자. 즉, 바이너리 형태로 큰 객체(이미지, 사운드 등)를 저장
    blob = cv2.dnn.blobFromImage(frame, scale, (416, 416), (0, 0, 0), True, crop=False)
    net.setInput(blob)  # 네트워크 입력 설정
    # 네트워크 순방향 실행을 위한 코드
    # input: 출력 레이어 이름 리스트
    # output: 지정한 레이어의 출력 블롭 리스트
    outs = net.forward(trackplayers.get_output_layer(net))
    # print("outs",outs)
    detected_players = trackplayers.predict_players(outs, LABELS, frame, 0.8)
    # print(detected_players)

    ############## 해석 필요 ####################

    # map 함수는 첫번째 매개변수에 함수, 두번째 매개변수에 반복 가능한 자료형(리스트, 튜플 등)
    # map 함수의 반환 값은 map 객체-> 해당 자료형을 list 혹은 tuple 로 형변환 필요
    # map(적용시킬 함수, 적용할 값들)
    # track players with a unique ID
    format_detected_players = list(map(trackplayers.update_boxes, list(detected_players)))
    # print("format_detected_players: ", format_detected_players)
    players_objects = ct_players.update(format_detected_players)
    # print(players_objects.items())

    # players positions frame by frame

    players_positions['x_0'].append(tuple(players_objects[0])[0])
    players_positions['y_0'].append(tuple(players_objects[0])[1])
    players_positions['x_1'].append(tuple(players_objects[1])[0])
    players_positions['y_1'].append(tuple(players_objects[1])[1])

    output_img = frame
    PIL_image = cv2.cvtColor(output_img, cv2.COLOR_BGR2RGB)
    PIL_image = Image.fromarray(PIL_image)

    # draw players boxes
    color_box = (0, 0, 255)
    if len(detected_players) > 0:
        for box in detected_players:
            x, y, w, h = box
            cv2.rectangle(output_img, (x, y), (x + w, y + h), color_box, 2)

    # draw tracking id of each player
    for (objectID, centroid_player)in players_objects.items():
        # draw both the ID of the object and the centroid of the
        # object on the output frame
        text = "ID {}".format(objectID)
        cv2.putText(output_img, text, (centroid_player[0] - 50, centroid_player[1]),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 3)
        cv2.circle(output_img, (centroid_player[0], centroid_player[1]), 1, (0, 255, 0), 2)

    # Convert PIL image format back to opencv image format
    opencvImage = cv2.cvtColor(np.array(PIL_image), cv2.COLOR_RGB2BGR)
    # write image to output_video
    output_video.write(opencvImage)

    # next frame
    current_frame += 1

# everything is done, release the video
video.release()
output_video.release()

# players positions
df_players_positions = pd.DataFrame()
df_players_positions['x_0'] = players_positions['x_0']
df_players_positions['y_0'] = players_positions['y_0']
df_players_positions['x_1'] = players_positions['x_1']
df_players_positions['y_1'] = players_positions['y_1']
df_players_positions.to_csv("tracking_players.csv")
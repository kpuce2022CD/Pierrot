import cv2
import argparse
import queue
import numpy
import pandas
import pickle
import time
from collections import deque

from sktime.datatypes._panel._convert import from_2d_array_to_nested
from PIL import Image, ImageDraw
from pickle import load
from tracknet import trackNet
from bounce import *
import trackplayers

# 인자값 받기
parser = argparse.ArgumentParser()
parser.add_argument("--path", type=str)
args = parser.parse_args()
path = args.path

# 변수정의
current_frame = 0
tracknet_width, tracknet_height = 640, 360
bounce = 1
coords = []
check_time = []
# 궤도를 그리기위한 프레임 7장 저장
trajectory_ball = deque()
for i in range(0, 8):
    trajectory_ball.appendleft(None)

# 필요 시 경로 수정, 현재 경로  colab기준
input_video_path = path + '/video/video_cut.mp4'
output_video_path = path + '/video/video_output.mp4'
model1_path = path + '/weight_ball/model.1'
bounce_clf_path = path + '/weight_ball/clf.pkl'
yolo_label_path = path + '/Yolov3/yolov3.txt'
yolo_weight_path = path + '/Yolov3/yolov3.weights'
yolo_cfg_path = path + '/Yolov3/yolov3.cfg'
tracking_players_path = path + 'tracking_players.csv'

# 영상불러오기 및 영상정보 추출
# 필요 시 경로 수정, 현재 경로  colab기준
video = cv2.VideoCapture(input_video_path)
fps = int(video.get(cv2.CAP_PROP_FPS))
frame_width = int(video.get(cv2.CAP_PROP_FRAME_WIDTH))
frame_height = int(video.get(cv2.CAP_PROP_FRAME_HEIGHT))
num_frames = int(video.get(cv2.CAP_PROP_FRAME_COUNT))

# 영상정보 출력
print('fps : {}'.format(fps))
print('frame sizee : {}x{}'.format(frame_width, frame_height))
print('num_frames :{}'.format(num_frames))

# 트렉넷 모델 불러오기 및 컴파일
modelFN = trackNet
model = modelFN(256, tracknet_height, tracknet_width)
model.compile(loss='categorical_crossentropy',
              optimizer='adadelta', metrics=['accuracy'])
# 필요 시 경로 수정, 현재 경로  colab기준
model.load_weights(model1_path)

# yolov3
# 라벨링한다 -> 변수정의라 생각함
LABELS = open(yolo_label_path).read().strip().split("\n")
# 네트워크 불러오기 -> opencv로 딥러닝을 실행하기 위해 생성
net = cv2.dnn.readNet(yolo_weight_path, yolo_cfg_path)

ct_players = trackplayers.CentroidTracker()

# append players positions at each frame
players_positions = {'x_0': [], 'y_0': [], 'x_1': [], 'y_1': []}

# 영상 저장을 위한 셋팅
fourcc = cv2.VideoWriter_fourcc(*'XVID')
output_video = cv2.VideoWriter(
    output_video_path, fourcc, fps, (frame_width, frame_height))

last = time.time()  # start counting
# 프레임단위로 반복
while True:
    print('percentage of video processed : {}%, number of frames : {}frame'.format(
        round((current_frame/num_frames)*100), current_frame))

    # 프레임단위로 읽기
    video.set(1, current_frame)
    ret, frame = video.read()

    if not ret:
        break

    # 프레임 사이즈 및 타입 수정을 위한 복사
    output_frame = frame

    #################### 선수 #############################
    scale = 0.00392
    # 입력 영상을 blob 객체로 만들기 -> 해당 인자들은 모델 파일의 학습에 맞게 입력되어있음
    # blob: Binary Large Object 의 약자. 즉, 바이너리 형태로 큰 객체(이미지, 사운드 등)를 저장
    blob = cv2.dnn.blobFromImage(
        frame, scale, (416, 416), (0, 0, 0), True, crop=False)
    net.setInput(blob)  # 네트워크 입력 설정
    # 네트워크 순방향 실행을 위한 코드
    # input: 출력 레이어 이름 리스트
    # output: 지정한 레이어의 출력 블롭 리스트
    outs = net.forward(trackplayers.get_output_layer(net))
    # print("outs",outs)
    # 선수들 위치
    detected_players = trackplayers.predict_players(outs, LABELS, frame, 0.8)
    # print(detected_players)

    ############## 해석 필요 ####################

    # map 함수는 첫번째 매개변수에 함수, 두번째 매개변수에 반복 가능한 자료형(리스트, 튜플 등)
    # map 함수의 반환 값은 map 객체-> 해당 자료형을 list 혹은 tuple 로 형변환 필요
    # map(적용시킬 함수, 적용할 값들)
    # track players with a unique ID
    format_detected_players = list(
        map(trackplayers.update_boxes, list(detected_players)))
    # print("format_detected_players: ", format_detected_players)
    players_objects = ct_players.update(format_detected_players)
    # print(players_objects.items())

    # players positions frame by frame

    players_positions['x_0'].append(tuple(players_objects[0])[0])
    players_positions['y_0'].append(tuple(players_objects[0])[1])
    players_positions['x_1'].append(tuple(players_objects[1])[0])
    players_positions['y_1'].append(tuple(players_objects[1])[1])

    # draw players boxes
    color_box = (0, 0, 255)

    # 프레임 사이즈 및 타임 수정
    frame = cv2.resize(frame, (tracknet_width, tracknet_height))
    frame = frame.astype(numpy.float32)

    # 아직 모름
    X = numpy.rollaxis(frame, 2, 0)

    # 히트맵 예측
    predict = model.predict(numpy.array([X]))[0]
    predict = predict.reshape(
        (tracknet_height, tracknet_width, 256)).argmax(axis=2)

    # cv2이미지 uint8로 변경해야만함
    predict = predict.astype(numpy.uint8)
    heatmap = cv2.resize(predict, (frame_width, frame_height))

    # 이미지 이진화작업 및 공 후보 트래킹 출력
    ret, heatmap = cv2.threshold(heatmap, 127, 255, cv2.THRESH_BINARY)
    circles = cv2.HoughCircles(heatmap, cv2.HOUGH_GRADIENT, dp=1,
                               minDist=1, param1=50, param2=2, minRadius=2, maxRadius=7)

    # 선수 draw
    if len(detected_players) > 0:
        for box in detected_players:
            print(box)
            x, y, w, h = box
            cv2.rectangle(output_frame, (x, y), (x + w, y + h), color_box, 2)

    # draw tracking id of each player
    for (objectID, centroid_player) in players_objects.items():
        # draw both the ID of the object and the centroid of the
        # object on the output frame
        text = "ID {}".format(objectID)
        cv2.putText(output_frame, text, (centroid_player[0] - 50, centroid_player[1]),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 3)
        cv2.circle(
            output_frame, (centroid_player[0], centroid_player[1]), 1, (0, 255, 0), 2)

    PIL_image = cv2.cvtColor(output_frame, cv2.COLOR_BGR2RGB)
    PIL_image = Image.fromarray(PIL_image)

    # 공 draw
    if circles is not None:
        print("공후보 트랙킹 성공")
        # 공후보가 하나 일 시 트래킹 표시
        if len(circles) == 1:
            print("공후보 하나")
            x = int(circles[0][0][0])
            y = int(circles[0][0][1])

            coords.append([x, y])
            check_time.append(time.time()-last)
            trajectory_ball.appendleft([x, y])
            trajectory_ball.pop()

        # 두 개 이상일 시 트래킹 표시하지 않음
        else:
            print("공후보 두개 이상")
            coords.append(None)
            check_time.append(time.time()-last)
            trajectory_ball.appendleft(None)
            trajectory_ball.pop()

    # 공 후보 트래킹 실패 시 트래킹 표시하지 않음
    else:
        coords.append(None)
        check_time.append(time.time()-last)
        trajectory_ball.appendleft(None)
        trajectory_ball.pop()

    # 전 7장의 프레임 후보공 draw
    for i in range(0, 8):
        if trajectory_ball[i] is not None:
            draw_x = trajectory_ball[i][0]
            draw_y = trajectory_ball[i][1]
            position_circle = (draw_x - 2, draw_y-2, draw_x+2, draw_y+2)
            draw = ImageDraw.Draw(PIL_image)
            draw.ellipse(position_circle, outline='yellow')
            del draw
    opencvImage = cv2.cvtColor(numpy.array(PIL_image), cv2.COLOR_RGB2BGR)
    output_video.write(opencvImage)
    current_frame += 1

video.release()
output_video.release()

# csv 파일 저장
df_players_positions = pandas.DataFrame()
df_players_positions['x_0'] = players_positions['x_0']
df_players_positions['y_0'] = players_positions['y_0']
df_players_positions['x_1'] = players_positions['x_1']
df_players_positions['y_1'] = players_positions['y_1']
df_players_positions.to_csv(tracking_players_path)


"""바운드체크"""

# 전 프레임의 공과 위치 비교 및 이상값제거
for _ in range(3):
    x, y = diff_xy(coords)
    remove_outliers(x, y, coords)

# 보간법. 트래킹이 안되었을 시 예측값삽입
coords = interpolation(coords)

# velocity
Vx = []
Vy = []
V = []
frames = [*range(len(coords))]
print("frames : {}".format(frames))

for i in range(len(coords)-1):
    p1 = coords[i]
    p2 = coords[i+1]
    t1 = check_time[i]
    t2 = check_time[i+1]
    x = (p1[0]-p2[0])/(t1-t2)
    y = (p1[1]-p2[1])/(t1-t2)
    Vx.append(x)
    Vy.append(y)

for i in range(len(Vx)):
    vx = Vx[i]
    vy = Vy[i]
    v = (vx**2+vy**2)**0.5
    V.append(v)

xy = coords[:]

if bounce == 1:
    # Predicting Bounces
    test_df = pandas.DataFrame(
        {'x': [coord[0] for coord in xy[:-1]], 'y': [coord[1] for coord in xy[:-1]], 'V': V})

    # df.shift
    for i in range(20, 0, -1):
        test_df[f'lagX_{i}'] = test_df['x'].shift(i, fill_value=0)
    for i in range(20, 0, -1):
        test_df[f'lagY_{i}'] = test_df['y'].shift(i, fill_value=0)
    for i in range(20, 0, -1):
        test_df[f'lagV_{i}'] = test_df['V'].shift(i, fill_value=0)

    test_df.drop(['x', 'y', 'V'], 1, inplace=True)

    Xs = test_df[['lagX_20', 'lagX_19', 'lagX_18', 'lagX_17', 'lagX_16',
                  'lagX_15', 'lagX_14', 'lagX_13', 'lagX_12', 'lagX_11', 'lagX_10',
                  'lagX_9', 'lagX_8', 'lagX_7', 'lagX_6', 'lagX_5', 'lagX_4', 'lagX_3',
                  'lagX_2', 'lagX_1']]
    Xs = from_2d_array_to_nested(Xs.to_numpy())

    Ys = test_df[['lagY_20', 'lagY_19', 'lagY_18', 'lagY_17',
                  'lagY_16', 'lagY_15', 'lagY_14', 'lagY_13', 'lagY_12', 'lagY_11',
                  'lagY_10', 'lagY_9', 'lagY_8', 'lagY_7', 'lagY_6', 'lagY_5', 'lagY_4',
                  'lagY_3', 'lagY_2', 'lagY_1']]
    Ys = from_2d_array_to_nested(Ys.to_numpy())

    Vs = test_df[['lagV_20', 'lagV_19', 'lagV_18',
                  'lagV_17', 'lagV_16', 'lagV_15', 'lagV_14', 'lagV_13', 'lagV_12',
                  'lagV_11', 'lagV_10', 'lagV_9', 'lagV_8', 'lagV_7', 'lagV_6', 'lagV_5',
                  'lagV_4', 'lagV_3', 'lagV_2', 'lagV_1']]
    Vs = from_2d_array_to_nested(Vs.to_numpy())

    X = pandas.concat([Xs, Ys, Vs], 1)

    # load the pre-trained classifier
    # 필요 시 경로 수정, 현재 경로  colab기준
    clf = load(open(bounce_clf_path, 'rb'))

    predcted = clf.predict(X)
    idx = list(numpy.where(predcted == 1)[0])
    idx = numpy.array(idx) - 10

# 바운드기능
    video = cv2.VideoCapture(output_video_path)

    output_video = cv2.VideoWriter(
        output_video_path, fourcc, fps, (frame_width, frame_height))
    i = 0
    while True:
        ret, frame = video.read()
        if ret:
            if coords[i] is not None:
                if i in idx:
                    center_coordinates = int(xy[i][0]), int(xy[i][1])
                    radius = 3
                    color = (255, 0, 0)
                    thickness = -1
                    cv2.circle(frame, center_coordinates, 10, color, thickness)
                i += 1
                output_video.write(frame)
        else:
            break
    video.release()
    output_video.release()


# """#colab 사용을 위한 사전 작업"""

# from google.colab import drive
# drive.mount('/content/drive')

# import sys
# sys.path.append('/content/drive/My Drive/Colab Notebooks')
# print(sys.path)

# !pip install sktime
import cv2
import queue
import numpy
import pandas
import pickle
import time

from sktime.datatypes._panel._convert import from_2d_array_to_nested
from PIL import Image, ImageDraw
from pickle import load
from tracknet import trackNet
from detection import *


# 변수정의
current_frame = 0
tracknet_width, tracknet_height = 640, 360
bounce = 1
output_video_path = 'video_output.mp4'
coords = []
check_time = []

# 영상불러오기 및 영상정보 추출
video = cv2.VideoCapture('video_cut.mp4')
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
model.load_weights("model.1")

# 궤도를 그리기위한 프레임 7장 저장
trajectory_ball = queue.deque()
for i in range(0, 8):
    trajectory_ball.appendleft(None)

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
    # video.set(1, current_frame)
    ret, frame = video.read()

    # 다음 프레임이 없으면 끝
    if not ret:
        break

    # 프레임 사이즈 및 타입 수정을 위한 복사
    output_frame = frame

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
    PIL_image = cv2.cvtColor(output_frame, cv2.COLOR_BGR2RGB)
    PIL_image = Image.fromarray(PIL_image)

    # 공후보 트래킹 성공 시 트래킹 표시
    if circles is not None:
        # 공후보가 하나 일 시 트래킹 표시
        if len(circles) == 1:
            x = int(circles[0][0][0])
            y = int(circles[0][0][1])
            coords.append([x, y])
            check_time.append(time.time()-last)
            trajectory_ball.appendleft([x, y])
            trajectory_ball.pop()

        # 두 개 이상일 시 트래킹 표시하지 않음
        else:
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

    print("recent location of ball : {}x{}".format(
        int(trajectory_ball[0][0]), int(trajectory_ball[0][1])))

    # 전 7장의 프레임 후보공 draw
    for i in range(0, 8):
        if trajectory_ball[i] is not None:
            draw_x = trajectory_ball[i][0]
            draw_y = trajectory_ball[i][1]
            bbox = (draw_x - 2, draw_y-2, draw_x+2, draw_y+2)
            draw = ImageDraw.Draw(PIL_image)
            draw.ellipse(bbox, outline='yellow')
            del draw

    opencvImage = cv2.cvtColor(numpy.array(PIL_image), cv2.COLOR_RGB2BGR)
    output_video.write(opencvImage)
    current_frame += 1

video.release()
output_video.release()

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
    clf = load(open('clf.pkl', 'rb'))

    predcted = clf.predict(X)
    idx = list(numpy.where(predcted == 1)[0])
    idx = numpy.array(idx) - 10

#   if minimap == 1:
#         video = cv2.VideoCapture('VideoOutput/video_with_map.mp4')
#   else:
    video = cv2.VideoCapture(output_video_path)

    output_width = int(video.get(cv2.CAP_PROP_FRAME_WIDTH))
    output_height = int(video.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = int(video.get(cv2.CAP_PROP_FPS))
    num_frames = int(video.get(cv2.CAP_PROP_FRAME_COUNT))
    fourcc = cv2.VideoWriter_fourcc(*'XVID')

    print('fps : {}'.format(fps))
    print('frame sizee : {}x{}'.format(output_width, output_height))
    print('num_frames :{}'.format(num_frames))

    output_video = cv2.VideoWriter(
        'final_video.mp4', fourcc, fps, (output_width, output_height))
    i = 0
    while True:
        ret, frame = video.read()
        if ret:
          # if coords[i] is not None:
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

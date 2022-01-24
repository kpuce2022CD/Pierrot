import cv2
import queue
import numpy
from PIL import Image, ImageDraw
from matplotlib import pyplot
from tracknet import trackNet

# 변수정의
current_frame = 0
tracknet_width, tracknet_height = 640, 360

# 영상불러오기 및 영상정보 추출
video = cv2.VideoCapture('video_cut.mp4')
fps = int(video.get(cv2.CAP_PROP_FPS))
frame_width = int(video.get(cv2.CAP_PROP_FRAME_WIDTH))
frame_height = int(video.get(cv2.CAP_PROP_FRAME_HEIGHT))
num_frames = int(video.get(cv2.CAP_PROP_FRAME_COUNT))

# 영상정보 출력
print('fps : {}'.format(fps))
print('frame sizee : {}x{}'.format(frame_width, frame_height))

# 트렉넷 모델 불러오기 및 컴파일
modelFN = trackNet
model = modelFN(256, tracknet_height, tracknet_width)
model.compile(loss='categorical_crossentropy',
              optimizer='adadelta', metrics=['accuracy'])

# 궤도를 그리기위한 프레임 7장 저장
trajectory_ball = queue.deque()
for i in range(0, 8):
    trajectory_ball.appendleft(None)

# 프레임단위로 반복
while True:
    print('percentage of video processed : {}'.format(
        round((current_frame/num_frames))))

    # 프레임단위로 읽기
    video.set(1, current_frame)
    ret, frame = video.read()

    if not ret:
        break

    # 프레임 사이즈 및 타입 수정을 위한 복사
    output_frame = frame

    # 프레임 사이즈 및 타임 수정
    frame = cv2.resize(frame, (frame_width, frame_height))
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
                               mindist=1, param1=50, param2=2, minRadius=2, maxRadius=7)
    PIL_image = cv2.cvtColor(output_frame, cv2.COLOR_BGR2RGB)
    PIL_image = Image.fromarray(PIL_image)

    # 공후보 트래킹 성공 시 트래킹 표시
    if circles is not None:
        # 공후보가 하나 일 시 트래킹 표시
        if len(circles) == 1:
            x = int(circles[0][0][0])
            y = int(circles[0][0][1])

            trajectory_ball.appendleft([x, y])
            trajectory_ball.pop()

        # 두개 이상일 시 트래킹 표시하지 않음
        else:
            trajectory_ball.appendleft(None)
            trajectory_ball.pop()
    # 공후보 트래킹 실패 시 트래킹 표시하지 않음
    else:
        trajectory_ball.appendleft(None)
        trajectory_ball.pop()

    # 전 7장의 프레임 후보공 draw
    for i in range(0, 8):
        draw_x = trajectory_ball[i][0]
        draw_y = trajectory_ball[i][1]
        bbox = (draw_x - 2, draw_y-2, draw_x+2, draw_y+2)
        draw = ImageDraw.ellipse(bbox, outline='yellow')
        del draw

    opencvImage = cv2.cvtColor(numpy.array(PIL_image), cv2.COLOR_RGB2BGR)
    frame.write(opencvImage)
    current_frame += 1
    pyplot.imshow(frame)

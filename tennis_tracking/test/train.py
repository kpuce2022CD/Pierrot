import cv2
import queue
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

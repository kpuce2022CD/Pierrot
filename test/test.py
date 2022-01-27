import cv2
from cv2 import threshold
import imutils
import math


def get_circle_dist(a, b):

    return math.sqrt(math.pow(b[0]-a[0], 2)+math.pow(b[1]-a[1], 2))


def nothing(x):
    pass


# 영상불러오기
cap = cv2.VideoCapture('video_cut.mp4')
window_width = 1280
window_height = 720
frame_count = 0
ball_x = ball_y = 0

while True:

    ret, frame = cap.read()
    # 영상이 끝나면 종료
    if not ret:
        break

    # 프레임수정
    frame = imutils.resize(frame, window_width, window_height)
    frame_gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    frame_blur = cv2.GaussianBlur(frame_gray, (0, 0), 1)
    ret, frame_binary = cv2.threshold(frame_blur, 130, 255, 0)

    # 원 트레킹
    if(cv2.HoughCircles(frame_binary, cv2.HOUGH_GRADIENT, dp=1, minDist=5, param1=100, param2=7, minRadius=2, maxRadius=3) is not None):
        circles = cv2.HoughCircles(
            frame_binary, cv2.HOUGH_GRADIENT, dp=1, minDist=5, param1=100, param2=7, minRadius=2, maxRadius=3)

    for i in circles[0]:
        cv2.circle(frame, (int(i[0]), int(i[1])), int(
            i[2]), (0, 0, 255), 5)
        print("location_ball : {}x{}".format(int(i[0]), int(i[1])))

    cv2.imshow("Video", frame)

    if cv2.waitKey(1) & 0xFF == 27:
        break

cap.release()
cv2.destroyAllWindows

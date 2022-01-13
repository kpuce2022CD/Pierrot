### 선수 트랙킹 ###
import collections

import cv2


# video, win name 입력
class Player:
    def __init__(self, video_src, win_name):
        self.tracker = cv2.TrackerCSRT_create
        self.player = None
        self.rival = None
        self.video_src = video_src  # video file
        self.cap = cv2.VideoCapture(self.video_src)
        self.fps = self.cap.get(cv2.CAP_PROP_FPS)
        self.win_name = win_name
        self.Point = collections.namedtuple('Point', ['x', 'y'])  # 좌표 저장하기위한 collection
        self.isFirst = True

    def play_video(self):
        if self.cap.isOpened():
            while True:
                ret, frame = self.cap.read()
                if not ret:
                    print("finish")
                    return
                if self.isFirst:
                    self.tracking(frame)
                img_draw = frame.copy()
        else:
            print('Cannot read video file')

    # 선수, 상대 선수 트랙킹
    def tracking(self, frame):
        # 선수
        player_roi = cv2.selectROI(self.win_name, frame, False)
        self.player = self.tracker()
        self.player.init(frame,player_roi)

        # 상대 선수
        rival_roi = cv2.selectROI(self.win_name,frame,False)
        self.rival = self.tracker()
        self.rival.init(frame,rival_roi)

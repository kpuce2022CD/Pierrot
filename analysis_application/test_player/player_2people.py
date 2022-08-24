### 선수 트랙킹 ###
import collections
import cv2
import csv


# 트랙킹놓쳤을 때 정지 시킨 후 다시 잡기, main 에서 실행시키기

# video, win name 입력
class Player:
    player = None
    rival = None
    isFirst = True
    player_distance = 0.0
    rival_distance = 0.0
    player_path_list = []
    rival_path_list = []
    player_coord_string = ''
    rival_coord_string = ''

    def __init__(self, video_src, win_name):
        self.tracker = cv2.TrackerCSRT_create
        self.video_src = video_src  # video file
        self.cap = cv2.VideoCapture(self.video_src)
        self.fps = self.cap.get(cv2.CAP_PROP_FPS)
        self.win_name = win_name


    def play_video(self):
        if self.cap.isOpened():
            player_coord_text = open('../Player_coord/2gamevideo_score1_player.json_coord.json', 'w')
            rival_coord_text = open('../Player_coord/2gamevideo_score1_rival_coord.json', 'w')

            count = 0
            while True:
                ret, frame = self.cap.read()
                if not ret:
                    print("finish")
                    player_coord_text.write(str(self.player_path_list))
                    player_coord_text.close()
                    rival_coord_text.write(str(self.rival_path_list))
                    rival_coord_text.close()
                    self.cap.release()
                    return

                    # 처음 실행시켰을 경우 두 선수를 잡아주어야 하기에
                img_draw = frame.copy()
                key = cv2.waitKey(1) & 0xff
                if key == ord(' ') or self.isFirst:
                    self.isFirst = False
                    self.tracking(frame)
                # 트랙커가 생성되지 않은 경우
                if self.player is None or self.rival is None:
                    self.tracking(frame)
                else:
                    player_ok, player_bbox = self.player.update(frame)
                    rival_ok, rival_bbox = self.rival.update(frame)
                    Point = collections.namedtuple('Point', ['x', 'y'])  # 좌표 저장하기위한 collection
                    (player_x, player_y, player_w, player_h) = player_bbox
                    (rival_x, rival_y, rival_w, rival_h) = rival_bbox

                    # 두 선수 좌표 저장
                    player_coord = [int(player_x + player_w / 2), int(player_y + player_h / 2)]
                    player_coord_point = Point(x=player_coord[0], y=player_coord[1])
                    rival_coord = [int(rival_x + rival_w / 2), int(rival_y + rival_h / 2)]
                    rival_coord_point = Point(x=rival_coord[0], y=rival_coord[1])

                    self.player_path_list.append(player_coord)
                    self.rival_path_list.append(rival_coord)
                    print(self.player_path_list)

                    # 두 선수 거리 저장
                    self.distance(count)
                    count += 1
                    # 추적 성공
                    if player_ok and rival_ok:
                        cv2.rectangle(img_draw, (int(player_x), int(player_y)),
                                      (int(player_x + player_w), int(player_y + player_h)), (0, 255, 0), 2, 1)
                        cv2.rectangle(img_draw, (int(rival_x), int(rival_y)),
                                      (int(rival_x + rival_w), int(rival_y + rival_h)), (0, 255, 255), 2, 1)
                        cv2.circle(img_draw, player_coord_point, 10, (0, 255, 0), -1)
                        cv2.circle(img_draw, rival_coord_point, 10, (0, 255, 255), -1)
                    # 추적 실패
                    else:
                        self.tracker(frame)
                cv2.imshow(self.win_name, img_draw)
        else:
            print('Cannot read video file')
            self.cap.release()


    # 선수, 상대 선수 트랙킹
    def tracking(self, frame):
        # 선수
        player_roi = cv2.selectROI(self.win_name, frame, False)
        if player_roi[2] and player_roi[3]:
            self.player = self.tracker()
            isInit = self.player.init(frame, player_roi)

    # 상대선수
        rival_roi = cv2.selectROI(self.win_name, frame, False)
        if rival_roi[2] and rival_roi[3]:
            self.rival = self.tracker()
            isInit = self.rival.init(frame, rival_roi)

        # 1좌표당 거리를 구한 후 수정 필요

    def distance(self, count):
        if count == 0:
            return
        player_x = self.player_path_list[count - 1][0] - self.player_path_list[count][0]
        player_y = self.player_path_list[count - 1][1] - self.player_path_list[count][1]
        self.player_distance += (player_x ** 2 + player_y ** 2) ** (1 / 2)
        print(self.player_distance)

        rival_x = self.rival_path_list[count - 1][0] - self.rival_path_list[count][0]
        rival_y = self.rival_path_list[count - 1][1] - self.rival_path_list[count][1]
        self.player_distance += (rival_x ** 2 + rival_y ** 2) ** (1 / 2)

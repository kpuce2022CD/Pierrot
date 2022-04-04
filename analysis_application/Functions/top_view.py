import cv2
import numpy as np
import pandas as pd
from copy import deepcopy


# input 으로 받은 좌표를 직사각형으로 바꿔주는 작업
def order_points(pts):
    # 4, 2 배열을 0으로 초기화 하여 만듦 타입은 float
    rect = np.zeros((4, 2), dtype="float32")
    # pts 는 4x2배열이고 이 배열을 axis 를 1을 기준으로 더하여 4x1배열로 만들어 반환
    # 이를 하는 이유는 바운딩 박스는 두 좌표만 존재하면 구현이 가능하므로
    # 좌 상단은 x,y 의 좌표의 합이 가장 작은 곳이고,
    # 우 하단은 x,y 의 좌표의 합이 가장 큰 곳이기에
    # 두 좌표의 합을 비교하여 좌 상단은 rect[0],
    # 우 하단은 rect[2] 에
    s = pts.sum(axis=1)
    rect[0] = pts[np.argmin(s)]
    rect[2] = pts[np.argmax(s)]
    # diff 를 x에서 y를 뺏을 때의 값을 구함
    # 우 상단은 diff 의 값이 가장 작은 곳
    # 좌 하단은 diff 의 값이 가장 큰 곳이기에
    # rect[1] 에는 우 상단, rect[3] 은 좌 하단
    diff = np.diff(pts, axis=1)
    rect[1] = pts[np.argmin(diff)]
    rect[3] = pts[np.argmax(diff)]
    return rect


# 코트의 좌표를 생성하는 모듈
def transition_matrix(image_pts, bev_pts):
    rect_image = order_points(image_pts)
    rect_bev = order_points(bev_pts)
    # getPerspectiveTransform 해당 함수는 직사각형이 아닌 좌표를 경기장 규격에 맞게 투시 변환을 해주기 위해 사용
    M = cv2.getPerspectiveTransform(rect_image, rect_bev)
    return M


# width 기준으로 코드 비율 맞춰 코드 변환
def court_coord(width, pad):
    height = int(width * (1 - pad) * 2 * (1 + pad))
    x_1, y_1 = int(width * pad), int(height * pad)
    x_2, y_2 = int(width * (1 - pad)), int(height * pad)
    x_3, y_3 = int(width * (1 - pad)), int(height * (1 - pad))
    x_4, y_4 = int(width * pad), int(height * (1 - pad))
    return [(x_1, y_1), (x_2, y_2), (x_3, y_3), (x_4, y_4)]


def player_coord(coord_image, M):
    X = list(coord_image)
    X.append(1)
    X = np.array(X)
    # X의 행렬 곱의 결과
    Y = M.dot(X)
    Y = tuple(map(lambda x: round(x / Y[2]), Y))
    return (Y[0], Y[1])


class top_view_court:
    def __init__(self, width, pad):
        line_color = (255, 255, 255)
        court_color_1 = (192, 158, 128)
        court_color_2 = (153, 112, 80)

        height = int(width * (1 - pad) * 2 * (1 + pad))
        self.court = np.zeros((height, width, 3), np.uint8)

        cv2.rectangle(self.court, (0, 0), (width, height), court_color_1, -1)

        # 외곽선
        x_1, y_1 = int(width * pad), int(height * pad)
        x_2, y_2 = int(width * (1 - pad)), int(height * pad)
        x_3, y_3 = int(width * (1 - pad)), int(height * (1 - pad))
        x_4, y_4 = int(width * pad), int(height * (1 - pad))

        cv2.rectangle(self.court, (x_1, y_1), (x_3, y_3), court_color_2, -1)
        cv2.line(self.court, (x_1, y_1), (x_2, y_2), line_color, 2)
        cv2.line(self.court, (x_2, y_2), (x_3, y_3), line_color, 2)
        cv2.line(self.court, (x_3, y_3), (x_4, y_4), line_color, 2)
        cv2.line(self.court, (x_4, y_4), (x_1, y_1), line_color, 2)
        
        # 실제 경기장과의 비율(단위 cm)
        self.ratio = 1097/(x_2 - x_1)
        print("x_2 - x_1: ", x_2 - x_1)

        # 실제 경기장 비율
        x_ratio = (x_2 - x_1) / 10.97
        y_ratio = (y_3 - y_2) / 23.78

        # 복식 라인
        xc_1, yc_1 = int(x_1 + x_ratio * 1.372), y_1
        xc_2, yc_2 = int(x_2 - x_ratio * 1.372), y_2
        xc_3, yc_3 = int(x_3 - x_ratio * 1.372), y_3
        xc_4, yc_4 = int(x_4 + x_ratio * 1.372), y_4

        cv2.line(self.court, (xc_1, yc_1), (xc_4, yc_4), line_color, 2)
        cv2.line(self.court, (xc_2, yc_2), (xc_3, yc_3), line_color, 2)

        # 서브라인
        xs_1, ys_1 = xc_1, int(y_1 + 5.50 * y_ratio)
        xs_2, ys_2 = xc_2, int(y_2 + 5.50 * y_ratio)
        xs_3, ys_3 = xc_3, int(y_3 - 5.50 * y_ratio)
        xs_4, ys_4 = xc_4, int(y_4 - 5.50 * y_ratio)

        cv2.line(self.court, (xs_1, ys_1), (xs_2, ys_2), line_color, 2)
        cv2.line(self.court, (xs_3, ys_3), (xs_4, ys_4), line_color, 2)

        # 네트
        xnet_1, ynet_1 = x_1, int((y_4 - y_1) / 2 + y_1)
        xnet_2, ynet_2 = x_2, int((y_4 - y_1) / 2 + y_1)

        cv2.line(self.court, (xnet_1, ynet_1), (xnet_2, ynet_2), line_color, 2)

        # 가운데 서브 라인
        xv_1, yv_1 = int((x_2 - x_1) / 2 + x_1), ys_1
        xv_2, yv_2 = int((x_2 - x_1) / 2 + x_1), ys_3
        cv2.line(self.court, (xv_1, yv_1,), (xv_2, yv_2), line_color, 2)

        # 중앙 마크 표시
        xm = int((x_2 - x_1) / 2 + x_1)
        ym_1 = y_1
        ym_2 = int(y_1 + 10)
        ym_3 = int(y_4 - 10)
        ym_4 = y_4

        cv2.line(self.court, (xm, ym_1), (xm, ym_2), line_color, 2)
        cv2.line(self.court, (xm, ym_3), (xm, ym_4), line_color, 2)

    # 선수 그리기
    def add_player(self, coord_bev, n_player, color_player_1, color_player_2):
        x, y = coord_bev
        if n_player == 0:
            cv2.circle(self.court, (x, y), radius=7, color=color_player_1, thickness=-1)
            cv2.circle(self.court, (x, y), radius=7, color=(255, 255, 255), thickness=2)
        elif n_player == 1:
            cv2.circle(self.court, (x, y), radius=7, color=color_player_2, thickness=-1)
            cv2.circle(self.court, (x, y), radius=7, color=(255, 255, 255), thickness=2)

    def add_ball(self, coord_bev, color):
      x, y = coord_bev
      cv2.circle(self.court, (x,y), radius = 4, color=color, thickness = -1)

    # 선수 이동 경로 그리기
    def add_path_player(self, coord_bev, color_path=(255, 255, 255)):
        x, y = coord_bev
        cv2.circle(self.court, (x, y), radius=1, color=color_path, thickness=-1)
    def get_ratio(self):
        return self.ratio


    def add_path_ball(self, coord_bev, color_path=(0,0,0)):
        x, y = coord_bev
        cv2.circle(self.court, (x, y), radius=1, color=color_path, thickness=-1)
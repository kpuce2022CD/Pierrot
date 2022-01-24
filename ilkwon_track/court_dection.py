import numpy as np
import cv2
from matplotlib import pyplot as plt
from sympy import Line
from itertools import combinations
from court_reference import CourtReference
import scipy.signal as sp

try:
    from google.colab.patches import cv2_imshow
except:
    pass

class CourtDetector:
    """
    Detecting and tracking court in frame
    """

    def __init__(self, verbose=0):
        self.verbose = verbose
        self.colour_threshold = 200
        self.dist_tau = 3
        self.intensity_threshold = 40
        self.court_reference = CourtReference()
        self.v_width = 0
        self.v_height = 0
        self.frame = None
        self.gray = None
        self.court_warp_matrix = []
        self.game_warp_matrix = []
        self.court_score = 0
        self.baseline_top = None
        self.baseline_bottom = None
        self.net = None
        self.left_court_line = None
        self.right_court_line = None
        self.left_inner_line = None
        self.right_inner_line = None
        self.middle_line = None
        self.top_inner_line = None
        self.bottom_inner_line = None
        self.success_flag = False
        self.success_accuracy = 80
        self.success_score = 1000
        self.best_conf = None
        self.frame_points = None
        self.dist = 5
        
        
        #기본적으로 화이트 구별하기 위한 함수
        def _threshold(self, frame):
            """
        간단한 thresholding으로 화이트 픽셀 구현
        """
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        gray = cv2.threshold(gray, 200, 255, cv2.THRESH_BINARY)[1] #여기서 왜 200으로 하는지 모르겠음 실행하면서 눈으로 봐야할것같음
        return gray
    
        def _filter_pixels(self, gray):
            """
        코트 라인 구조를 사용해서 픽셀을 수정
        """
        for i in range(self.dist_tau, len(gray) - self.dist_tau): #tau : 임계값, range(시작숫자,종료숫자)
            for j in range(self.dist_tau, len(gray[0]) - self.dist_tau):
                if gray[i, j] == 0:
                    continue
                if (gray[i, j] - gray[i + self.dist_tau, j] > self.intensity_threshold and gray[i, j] - gray[i - self.dist_tau, j] > self.intensity_threshold):
                    continue
                if (gray[i, j] - gray[i, j + self.dist_tau] > self.intensity_threshold and gray[i, j] - gray[i, j - self.dist_tau] > self.intensity_threshold):
                    continue
                gray[i, j] = 0
        return gray
    
        def _filter_pixels(self, gray):
            """
        코트 라인 구조를 사용해서 픽셀을 수정
        """
        for i in range(self.dist_tau, len(gray) - self.dist_tau): #tau : 임계값, range(시작숫자,종료숫자)
            for j in range(self.dist_tau, len(gray[0]) - self.dist_tau):
                if gray[i, j] == 0:
                    continue
                if (gray[i, j] - gray[i + self.dist_tau, j] > self.intensity_threshold and gray[i, j] - gray[i - self.dist_tau, j] > self.intensity_threshold):
                    continue
                if (gray[i, j] - gray[i, j + self.dist_tau] > self.intensity_threshold and gray[i, j] - gray[i, j - self.dist_tau] > self.intensity_threshold):
                    continue
                gray[i, j] = 0
        return gray
    
        def _detect_lines(self, gray):
            """
        Hough transform을 사용해 선을 찾아내는 함수
        """
        minLineLength = 100
        maxLineGap = 20
        # 모든 라인 탐지하기
        # 선의 시작과 끝 좌표를 추출, 작업 직전에 그레이 스케일 변환이 필요
        lines = cv2.HoughLinesP(gray, 1, np.pi / 180, 80, minLineLength=minLineLength, maxLineGap=maxLineGap)
        lines = np.squeeze(lines) #추출한 선을 축소
        if self.verbose:
            display_lines_on_frame(self.frame.copy(), [], lines)

        # slcope 활용해서 선 구별하기
        horizontal, vertical = self._classify_lines(lines) #(x,y)
        if self.verbose:
            display_lines_on_frame(self.frame.copy(), horizontal, vertical)

        # 프레임에 같은 선을 합병
        horizontal, vertical = self._merge_lines(horizontal, vertical)
        if self.verbose:
            display_lines_on_frame(self.frame.copy(), horizontal, vertical)

        return horizontal, vertical # 대각선 피하려고 수평수직함
    
        def _classify_lines(self, lines):
            """
        수직과 수평선을 구분하기 위한 함수
        """
        horizontal = []
        vertical = []
        highest_vertical_y = np.inf
        lowest_vertical_y = 0
        for line in lines:
            x1, y1, x2, y2 = line
            dx = abs(x1 - x2)
            dy = abs(y1 - y2)
            if dx > 2 * dy:
                horizontal.append(line)
            else:
                vertical.append(line)
                highest_vertical_y = min(highest_vertical_y, y1, y2)
                lowest_vertical_y = max(lowest_vertical_y, y1, y2)
                
        # 수직선의 최고점과 최저점을 이용하여 수평선을 filter하는 함수
        clean_horizontal = []
        h = lowest_vertical_y - highest_vertical_y
        lowest_vertical_y += h / 15
        highest_vertical_y -= h * 2 / 15
        for line in horizontal:
            x1, y1, x2, y2 = line
            if lowest_vertical_y > y1 > highest_vertical_y and lowest_vertical_y > y1 > highest_vertical_y:
                clean_horizontal.append(line)
        return clean_horizontal, vertical
    
        def _classify_vertical(self, vertical, width):
            """
        프래임안에 위치하는 선을 활용해 수직선의 오른쪽과 왼쪽을 구분하는 함수 
        """
        vertical_lines = []
        vertical_left = []
        vertical_right = []
        right_th = width * 4 / 7
        left_th = width * 3 / 7
        for line in vertical:
            x1, y1, x2, y2 = line
            if x1 < left_th or x2 < left_th:
                vertical_left.append(line)
            elif x1 > right_th or x2 > right_th:
                vertical_right.append(line)
            else:
                vertical_lines.append(line)
        return vertical_lines, vertical_left, vertical_right
    
        def _merge_lines(self, horizontal_lines, vertical_lines):
            """
        같은 프레임에 속해있는 선들을 merge하는 함수
        """

        # 수평선 합병
        horizontal_lines = sorted(horizontal_lines, key=lambda item: item[0])
        mask = [True] * len(horizontal_lines)
        new_horizontal_lines = []
        for i, line in enumerate(horizontal_lines):
            if mask[i]:
                for j, s_line in enumerate(horizontal_lines[i + 1:]):
                    if mask[i + j + 1]:
                        x1, y1, x2, y2 = line
                        x3, y3, x4, y4 = s_line
                        dy = abs(y3 - y2)
                        if dy < 10:
                            points = sorted(
                                [(x1, y1), (x2, y2), (x3, y3), (x4, y4)], key=lambda x: x[0])
                            line = np.array([*points[0], *points[-1]])
                            mask[i + j + 1] = False
                new_horizontal_lines.append(line)

        # 수직선 합병
        vertical_lines = sorted(vertical_lines, key=lambda item: item[1])
        xl, yl, xr, yr = (0, self.v_height * 6 / 7,
                          self.v_width, self.v_height * 6 / 7)
        mask = [True] * len(vertical_lines)
        new_vertical_lines = []
        for i, line in enumerate(vertical_lines):
            if mask[i]:
                for j, s_line in enumerate(vertical_lines[i + 1:]):
                    if mask[i + j + 1]:
                        x1, y1, x2, y2 = line
                        x3, y3, x4, y4 = s_line
                        xi, yi = line_intersection(
                            ((x1, y1), (x2, y2)), ((xl, yl), (xr, yr)))
                        xj, yj = line_intersection(
                            ((x3, y3), (x4, y4)), ((xl, yl), (xr, yr)))

                        dx = abs(xi - xj)
                        if dx < 10:
                            points = sorted(
                                [(x1, y1), (x2, y2), (x3, y3), (x4, y4)], key=lambda x: x[1])
                            line = np.array([*points[0], *points[-1]])
                            mask[i + j + 1] = False

                new_vertical_lines.append(line)
        return new_horizontal_lines, new_vertical_lines
    
        def _find_homography(self, horizontal_lines, vertical_lines):
            """
        reference court에서 매칭하기 위해 사용하는 4개의 점으로부터 transformation을 찾는 함수
        """
        max_score = -np.inf
        max_mat = None
        max_inv_mat = None
        k = 0
        # 모든 쌍의 수직과 모든쌍의 수평선을 over loop함
        for horizontal_pair in list(combinations(horizontal_lines, 2)):
            for vertical_pair in list(combinations(vertical_lines, 2)):
                h1, h2 = horizontal_pair
                v1, v2 = vertical_pair
                # 모든 선들의 점들의 교차로를 찾는 것
                i1 = line_intersection((tuple(h1[:2]), tuple(h1[2:])), (tuple(v1[0:2]), tuple(v1[2:])))
                i2 = line_intersection((tuple(h1[:2]), tuple(h1[2:])), (tuple(v2[0:2]), tuple(v2[2:])))
                i3 = line_intersection((tuple(h2[:2]), tuple(h2[2:])), (tuple(v1[0:2]), tuple(v1[2:])))
                i4 = line_intersection((tuple(h2[:2]), tuple( h2[2:])), (tuple(v2[0:2]), tuple(v2[2:])))

                intersections = [i1, i2, i3, i4]
                intersections = sort_intersection_points(intersections)

                for i, configuration in self.court_reference.court_conf.items():
                    # 교차점 찾기
                    matrix, _ = cv2.findHomography(np.float32(
                        configuration), np.float32(intersections), method=0)
                    inv_matrix = cv2.invert(matrix)[1]
                    # 교차점 score 변수화
                    confi_score = self._get_confi_score(matrix)

                    if max_score < confi_score:
                        max_score = confi_score
                        max_mat = matrix
                        max_inv_mat = inv_matrix
                        self.best_conf = i

                    k += 1

        if self.verbose:
            frame = self.frame.copy()
            court = self.add_court_overlay(frame, max_mat, (255, 0, 0))
            cv2.imshow('court', court)
            if cv2.waitKey(0) & 0xff == 27:
                cv2.destroyAllWindows()

        return max_mat, max_inv_mat, max_score
    
    
        def _get_confi_score(self, matrix):
            """
        교차 스코어 계산하기
        """
        court = cv2.warpPerspective(self.court_reference.court, matrix, self.frame.shape[1::-1])
        court[court > 0] = 1
        gray = self.gray.copy()
        gray[gray > 0] = 1
        correct = court * gray
        wrong = court - correct
        c_p = np.sum(correct)
        w_p = np.sum(wrong)
        return c_p - 0.5 * w_p
    
        def add_court_overlay(self, frame, homography=None, overlay_color=(255, 255, 255), frame_num=-1):
            """
        코트 프레임에서 overlay하는 부분을 추가함
        """
        if homography is None and len(self.court_warp_matrix) > 0 and frame_num < len(self.court_warp_matrix):
            homography = self.court_warp_matrix[frame_num]
        court = cv2.warpPerspective(
            self.court_reference.court, homography, frame.shape[1::-1])
        frame[court > 0, :] = overlay_color
        return frame
    
        def find_lines_location(self):
            """
        프레임 위에 중요한 위치에 선을 찾아냄
        """
        self.p = np.array(self.court_reference.get_important_lines(),dtype=np.float32).reshape((-1, 1, 2))
        self.lines = cv2.perspectiveTransform(self.p, self.court_warp_matrix[-1]).reshape(-1)
        return self.lines
    
        def get_warped_court(self):
            """
        코트 레퍼런스와 코트 교차점을 사용하여 뒤틀린 코트를 리턴받음
        """
        court = cv2.warpPerspective(
            self.court_reference.court, self.court_warp_matrix[-1], self.frame.shape[1::-1])
        court[court > 0] = 1
        return court
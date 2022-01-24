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
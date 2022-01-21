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
import cv2
import numpy as np

import csv


def court_draw(frame, position_xy):

    frontcourt = np.array([[496, 516], [365, 858], [1563, 857], [1422, 511]])
    # front_deuceside = np.array(
    #     [[435, 220], [435, 284], [622, 285], [585, 220]])
    # front_adside = np.array([[288, 220], [250, 283], [435, 284], [435, 220]])
    backcourt = np.array([[578, 303], [496, 516], [1422, 511], [1333, 303]])
    if position_xy[1] > 490:
        cv2.polylines(frame, [frontcourt], True, (0, 0, 255), 3)
    else:
        cv2.polylines(frame, [backcourt], True, (0, 0, 255), 3)

    # cv2.polylines(frame, [front_deuceside], True, (0, 0, 255), 3)
    # cv2.polylines(frame, [front_adside], True, (0, 0, 255), 3)


'''
    x_1 = 116
    y_1 = 368

    x_2 = 752
    y_2 = 372

    x_3 = 290
    y_3 = 151

    x_4 = 580
    y_4 = 151

    x_5 = 326
    y_5 = 151

    x_6 = 544
    y_6 = 151

    x_7 = 312
    y_7 = 177

    x_8 = 435
    y_8 = 177

    x_9 = 560
    y_9 = 177

    x_10 = 250
    y_10 = 282

    x_11 = 435
    y_11 = 282

    x_12 = 620
    y_12 = 285

    x_13 = 197
    y_13 = 370

    x_14 = 671
    y_14 = 370

    cv2.line(frame, (x_1, y_1), (x_3, y_3), (0, 0, 225), 3)
    cv2.line(frame, (x_3, y_3), (x_4, y_4), (0, 0, 225), 3)
    cv2.line(frame, (x_4, y_4), (x_2, y_2), (0, 0, 225), 3)
    cv2.line(frame, (x_1, y_1), (x_2, y_2), (0, 0, 225), 3)
    cv2.line(frame, (x_5, y_5), (x_13, y_13), (0, 0, 225), 3)
    cv2.line(frame, (x_6, y_6), (x_14, y_14), (0, 0, 225), 3)
    cv2.line(frame, (x_7, y_7), (x_9, y_9), (0, 0, 225), 3)
    cv2.line(frame, (x_10, y_10), (x_12, y_12), (0, 0, 225), 3)
    cv2.line(frame, (x_8, y_8), (x_11, y_11), (0, 0, 225), 3)
'''

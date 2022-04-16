import cv2
import numpy as np

frontcourt = np.array([[496, 516], [362, 858], [1563, 857], [1418, 511]])
front_dueceside_left = np.array(
    [[496, 516], [362, 858], [518, 856], [612, 515]])
front_dueceside_center = np.array(
    [[612, 515], [518, 856], [754, 854], [782, 518]])
front_dueceside_right = np.array(
    [[782, 518], [754, 854], [963, 852], [958, 517]])
front_adside_left = np.array(
    [[958, 517], [963, 852], [1174, 853], [1139, 517]])
front_adside_center = np.array(
    [[1139, 517], [1174, 853], [1410, 856], [1305, 516]])
front_adside_right = np.array(
    [[1305, 516], [1410, 856], [1563, 857], [1418, 511]])
backcourt = np.array([[578, 303], [496, 516], [1422, 511], [1333, 303]])
back_adside_right = np.array([[578, 302], [496, 516], [614, 515], [672, 304]])
back_adside_center = np.array([[672, 304], [614, 515], [789, 515], [814, 304]])
back_adside_left = np.array([[814, 304], [789, 515], [958, 518], [956, 304]])
back_dueceside_right = np.array(
    [[956, 304], [958, 518], [1139, 518], [1092, 304]])
back_dueceside_center = np.array(
    [[1092, 304], [1139, 518], [1305, 514], [1239, 303]])
back_dueceside_left = np.array(
    [[1239, 303], [1305, 514], [1422, 511], [1333, 303]])
sel = None


def court_draw(frame, position_xy):

    if position_xy[1] > 480:
        cv2.polylines(frame, [frontcourt], True, (0, 0, 255), 3)

    else:
        cv2.polylines(frame, [backcourt], True, (0, 0, 255), 3)


def present_bounce(frame, position_xy, balls_bounces):
    if position_xy[1] > 480:
        if position_xy[0] > front_dueceside_left[0][0] and position_xy[0] < front_dueceside_left[3][0]:
            sel = front_dueceside_left, 'front_dueceside_left'
        elif position_xy[0] > front_dueceside_center[0][0] and position_xy[0] < front_dueceside_center[3][0]:
            sel = front_dueceside_center, 'front_dueceside_center'
        elif position_xy[0] > front_dueceside_right[0][0] and position_xy[0] < front_dueceside_right[3][0]:
            sel = front_dueceside_right, 'front_dueceside_right'
        elif position_xy[0] > front_adside_left[0][0] and position_xy[0] < front_adside_left[3][0]:
            sel = front_adside_left, 'front_adside_left'
        elif position_xy[0] > front_adside_center[0][0] and position_xy[0] < front_adside_center[3][0]:
            sel = front_adside_center, 'front_adside_center'
        elif position_xy[0] > front_adside_right[0][0] and position_xy[0] < front_adside_right[3][0]:
            sel = front_adside_right, 'front_adside_right'
    else:
        if position_xy[0] > back_dueceside_left[1][0] and position_xy[0] < back_dueceside_left[2][0]:
            sel = back_dueceside_left, 'back_dueceside_left'
        elif position_xy[0] > back_dueceside_center[1][0] and position_xy[0] < back_dueceside_center[2][0]:
            sel = back_dueceside_center, 'back_dueceside_center'
        elif position_xy[0] > back_dueceside_right[1][0] and position_xy[0] < back_dueceside_right[2][0]:
            sel = back_dueceside_right, 'back_dueceside_right'
        elif position_xy[0] > back_adside_left[1][0] and position_xy[0] < back_adside_left[2][0]:
            sel = back_adside_left, 'back_adside_left'
        elif position_xy[0] > back_adside_center[1][0] and position_xy[0] < back_adside_center[2][0]:
            sel = back_adside_center, 'back_adside_center'
        elif position_xy[0] > back_adside_right[1][0] and position_xy[0] < back_adside_right[2][0]:
            sel = back_adside_right, 'back_adside_right'

    cv2.polylines(frame, [sel[0]], True, (0, 255, 0), 3)
    balls_bounces['court'].append(sel)

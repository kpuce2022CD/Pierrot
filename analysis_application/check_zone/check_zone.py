import court_draw
import cv2
import pandas as pd
import numpy as np

cap = cv2.VideoCapture('video_cut.mp4')

if cap is None:
    print("no")

position_xy = []
position_df = pd.read_csv('tracking_balls.csv')
position_xy = list(zip(position_df['x'], position_df['y']))
i = 0

while(True):
    ret, frame = cap.read()

    if not ret:
        break

    court_draw.court_draw(frame, position_xy[i])
    i += 1

    cv2.imshow('frame', frame)
    cv2.waitKey(0)

cap.release()
cv2.destroyAllWindows()

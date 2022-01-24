# ball tracking test

import cv2

cap = cv2.VideoCapture(0)

while True:

    ret,img_color = cap.read()
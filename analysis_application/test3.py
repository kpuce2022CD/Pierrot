import csv
import cv2
import numpy as np

f = open("tracking_players.csv", 'r', encoding='utf-8')
rdr = csv.reader(f)

width, height = 640, 360
red = (0, 0, 255)
blue = (255, 0, 0)
green = (0, 255, 0)
black = (0, 0, 0)

img = np.zeros((width, height, 3), np.uint8)

video_path = "video/video_cut.mp4"
cap = cv2.VideoCapture(video_path)
frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

ok, frame = cap.read()
if not ok:
    print("영상 안열림")
cv2.imwrite("image.png",frame)
imageCopy = cv2.imread('image.png')

for line in list(rdr)[1:]:
    x0, y0, x1, y1 = list(map(int, line[1:]))
    print(x0, y0, x1, y1)
    imageCopy= cv2.line(imageCopy, (x0, x0), (x0, x0), red, 5)
    imageCopy=cv2.line(imageCopy, (x1, x1), (x1, x1), blue, 5)
    imageCopy=cv2.line(imageCopy, (y0, y0), (y0, y0), green, 5)
    imageCopy=cv2.line(imageCopy, (y1, y1), (y1, y1), black, 5)

f.close()

cv2.imshow('image', imageCopy)
cv2.imwrite("image2.png",imageCopy)
cv2.waitKey(0)
cv2.destroyAllWindows()

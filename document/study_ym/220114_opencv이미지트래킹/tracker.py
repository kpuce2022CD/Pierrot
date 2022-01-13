import cv2
from cv2 import THRESH_BINARY_INV
import matplotlib.pyplot as plt

# # R,G,B트랙바 만들기
# # def change_color(x):
# #     r = cv2.getTrackbarPos("R","Image")
# #     g = cv2.getTrackbarPos("G","Image")
# #     b = cv2.getTrackbarPos("B","Image")
# #     image[:] = [b,g,r]
# #     cv2.imshow("Image",image)

# # image = np.zeros((600,400,3),np.uint8)
# # cv2.namedWindow("Image")

# # cv2.createTrackbar("R","Image",0,255,change_color)
# # cv2.createTrackbar("G","Image",0,255,change_color)
# # cv2.createTrackbar("B","Image",0,255,change_color)

# # cv2.imshow("Image",image)
# # cv2.waitKey(0)

# # 직선그래프그리기
# # image = np.full((512,512,3),255,np.uint8)
# # image = cv2.line(image, (0,0),(255,255),(255,0,0),10)

# # plt.imshow(image)
# # plt.show()

# #사각형그리기
# # image = np.full((512,512,3),255,np.uint8)
# # image = cv2.rectangle(image, (20,20),(255,255),(255,0,0),3)

# # plt.imshow(image)
# # plt.show()

# # 텍스트그리기
# # image = np.full((512,512,3),255,np.uint8)
# # image = cv2.putText(image,'Hello World',(0,200),cv2.FONT_ITALIC,2,(255,0,0))

# # plt.imshow(image)
# # plt.show()

# 고양이 트래킹
# image = cv2.imread('catImage.jpg')
# image_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
# ret, thresh = cv2.threshold(image_gray, 127,255,0)

# plt.imshow(cv2.cvtColor(thresh,cv2.COLOR_GRAY2BGR))
# plt.show()

# contours = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)[0]
# image = cv2.drawContours(image, contours, -1, (0,255,0),4)

# plt.imshow(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
# plt.show()

#숫자 트래킹
# image = cv2.imread('numImage.jpg')
# image_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
# ret, thresh = cv2.threshold(image_gray, 127,255,0)
# thresh = cv2.bitwise_not(thresh)

# plt.imshow(cv2.cvtColor(thresh, cv2.COLOR_GRAY2BGR))
# plt.show()

# contours = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)[0]
# image = cv2.drawContours(image, contours, -1, (0,0,255),2)

# plt.imshow(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
# plt.show()

# contour = contours[0]
# x, y, w, h = cv2.boundingRect(contour)
# image = cv2.rectangle(image, (x,y), (x+w, y+h), (0,255,0),2)

# plt.imshow(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
# plt.show()

# hull = cv2.convexHull(contour)
# image = cv2.drawContours(image, [hull], -1, (255,0,0),2)

# plt.imshow(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
# plt.show()
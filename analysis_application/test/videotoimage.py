import cv2

# 영상의 의미지를 연속적으로 캡쳐할 수 있게 하는 class
vidcap = cv2.VideoCapture('../video/3gamevideo_score7.mp4')

count = 0

while (vidcap.isOpened()):
    ret, image = vidcap.read()
    if (int(vidcap.get(1)) % 357 == 0):
        print('Saved frame number : ' + str(int(vidcap.get(1))))
        cv2.imwrite("./frame/frame%d.jpg" % count, image)
        print('Saved frame%d.jpg' % count)
        count += 1


vidcap.release()
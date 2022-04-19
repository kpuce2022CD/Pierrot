import cv2


def onMouse(event, x, y, flags, param):
    # if event == cv2.EVENT_LBUTTONDOWN:
    #     print('왼쪽 마우스 클릭 했을 때 좌표 : ', x, y)
    if event == cv2.EVENT_LBUTTONUP:
        print('왼쪽 마우스 클릭 땠을 때 좌표 : ', x, y)
    # elif event == cv2.EVENT_MOUSEMOVE:
    #     print('현재 이동하는 좌표 : ', x, y)
    #     if flags & cv2.EVENT_FLAG_LBUTTON:
    #         cv2.circle(img, (x, y), 5, (0, 0, 255), -1)
    #         cv2.imshow('image', img)


img = cv2.imread('./frame0.jpg')
if img is None:
    print("no")
cv2.imshow('image', img)
cv2.setMouseCallback('image', onMouse)
cv2.waitKey()

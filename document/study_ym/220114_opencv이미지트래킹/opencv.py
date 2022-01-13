# import cv2
# import matplotlib.pyplot as plt
# import time

# # img_basic = cv2.imread('catImage.jpg', cv2.IMREAD_ANYCOLOR)
# # cv2.imshow('Image Basic',img_basic)
# # cv2.waitKey(0)
# # cv2.imwrite('result1.png',img_basic)

# # cv2.destroyAllWindows()

# # img_gray = cv2.cvtColor(img_basic,cv2.COLOR_BGR2GRAY)
# # cv2.imshow('Image Gray',img_gray)
# # cv2.waitKey(0)
# # cv2.imwrite('result2.png',img_gray)

# image = cv2.imread('catImage.jpg')
# # 픽셀 수 및 이미지 크기 확인
# print(image.shape)
# print(image.size)

# # 이미지 Numpy 객체의 특정 필셀을 가리킵니다.
# px = image[100,100]

# # B, G, R 순서로 출력됩니다.
# # (단, Gray Scale인 경우에는 B, G, R로 구분되지 않습니다.)
# print(px)

# # R 값만 출력하기
# print(px[2])

# start_time : float = time.time()
# image[0:100, 0:100] = [0,0,0]

# print("---%s seconds ---" %(time.time() - start_time))    

# plt.imshow(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
# plt.show()


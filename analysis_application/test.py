import cv2

# 영상불러오기 및 영상정보 추출
video = cv2.VideoCapture("./video/score3.mp4")
fps = int(video.get(cv2.CAP_PROP_FPS))
frame_width = int(video.get(cv2.CAP_PROP_FRAME_WIDTH))
frame_height = int(video.get(cv2.CAP_PROP_FRAME_HEIGHT))
num_frames = int(video.get(cv2.CAP_PROP_FRAME_COUNT))

# 영상정보 출력
print('fps : {}'.format(fps))
print('frame sizee : {}x{}'.format(frame_width, frame_height))
print('num_frames :{}'.format(num_frames))
i = 0
while True:
    ret, frame = video.read()

    i += 1
    print(i)

    if not ret:
        break

    cv2.imshow('video', frame)
    cv2.waitKey(0)

video.release()
cv2.destroyAllWindows()

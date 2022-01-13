# Tracker APIs (track_trackingAPI.py)
import collections
import cv2



# 트랙커 객체 생성자 함수 리스트 ---①
trackers = cv2.TrackerCSRT_create
tracker = None
tracker1 = None
isFirst = True

video_src = 0  # 비디오 파일과 카메라 선택 ---②
video_src = "input_video.mp4"
cap = cv2.VideoCapture(video_src)
fps = cap.get(cv2.CAP_PROP_FPS)  # 프레임 수 구하기
delay = int(1000 / fps)
win_name = 'Tracking APIs'

Point = collections.namedtuple('Point', ['x', 'y'])

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        print('Cannot read video file')
        break
    img_draw = frame.copy()
    if tracker is None:  # 트랙커 생성 안된 경우
        cv2.putText(img_draw, "Press the Space to set ROI!!", (100, 80), cv2.FONT_HERSHEY_SIMPLEX, 0.75, (0, 0, 255), 2, cv2.LINE_AA)
    else:
        ok, bbox = tracker.update(frame)  # 새로운 프레임에서 추적 위치 찾기 ---③
        ok1, bbox1 = tracker1.update(frame)  # 새로운 프레임에서 추적 위치 찾기 ---③
        (x, y, w, h) = bbox
        (x1, y1, w1, h1) = bbox1
        print("bbox",bbox)
        print("bbox1",bbox1)
        # 선수 좌표 저장
        player_coord1 = Point(x=int(x+w/2), y=int(y+h/2))
        cv2.circle(img_draw,player_coord1,10,(0,0,255),-1)

        if ok:  # 추적 성공
            cv2.rectangle(img_draw, (int(x), int(y)), (int(x + w), int(y + h)), \
                          (0, 255, 0), 2, 1)
        else:  # 추적 실패
            cv2.putText(img_draw, "Tracking fail.", (100, 80), \
                        cv2.FONT_HERSHEY_SIMPLEX, 0.75, (0, 0, 255), 2, cv2.LINE_AA)
        if ok1:  # 추적 성공
            cv2.rectangle(img_draw, (int(x1), int(y1)), (int(x1 + w1), int(y1 + h1)), \
                          (0, 255, 255), 2, 1)
        else:  # 추적 실패
            cv2.putText(img_draw, "Tracking fail.", (100, 80), \
                        cv2.FONT_HERSHEY_SIMPLEX, 0.75, (0, 0, 255), 2, cv2.LINE_AA)

    # trackerName = tracker.__class__.__name__
    # cv2.putText(img_draw, ":" + trackerName, (100, 20), \
    #             cv2.FONT_HERSHEY_SIMPLEX, 0.75, (0, 255, 0), 2, cv2.LINE_AA)
    cv2.putText(img_draw,"Player1",(100,80), cv2.FONT_HERSHEY_SIMPLEX,0.75,(0,0,255),2,cv2.LINE_AA)

    cv2.imshow(win_name, img_draw)
    key = cv2.waitKey(delay) & 0xff
    # 스페이스 바 또는 비디오 파일 최초 실행 ---④
    if key == ord(' ') or (video_src != 0 and isFirst):
        isFirst = False
        print("roi 전")
        roi = cv2.selectROI(win_name, frame, False)  # 초기 객체 위치 설정
        print("roi 후")
        print("roi", roi)
        if roi[2] and roi[3]:  # 위치 설정 값 있는 경우
            print("roi[2] and roi[3]")
            tracker = trackers()  # 트랙커 객체 생성 ---⑤
            isInit = tracker.init(frame, roi)

        print("pause")
        roi1 = cv2.selectROI(win_name,frame,False)
        if roi1[2] and roi1[3]:  # 위치 설정 값 있는 경우
            print("roi[2] and roi[3]")
            tracker1 = trackers()  # 트랙커 객체 생성 ---⑤
            isInit = tracker1.init(frame, roi1)
    elif key == 27:
        break
else:
    print("Could not open video")

cap.release()
cv2.destroyAllWindows()

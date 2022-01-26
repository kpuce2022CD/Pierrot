# MPII 를 사용한 신체부위 검출 - 첫번재 프레임만 테스트 완료
# cv2.dnn

import cv2

BODY_PARTS = {"Head": 0, "Neck": 1, "RShoulder": 2, "RElbow": 3, "RWrist": 4,
              "LShoulder": 5, "LElbow": 6, "LWrist": 7, "RHip": 8, "RKnee": 9,
              "RAnkle": 10, "LHip": 11, "LKnee": 12, "LAnkle": 13, "Chest": 14,
              "Background": 15}

POSE_PAIRS = [["Head", "Neck"], ["Neck", "RShoulder"], ["RShoulder", "RElbow"],
              ["RElbow", "RWrist"], ["Neck", "LShoulder"], ["LShoulder", "LElbow"],
              ["LElbow", "LWrist"], ["Neck", "Chest"], ["Chest", "RHip"], ["RHip", "RKnee"],
              ["RKnee", "RAnkle"], ["Chest", "LHip"], ["LHip", "LKnee"], ["LKnee", "LAnkle"]]

protoFile = "./data/pose_deploy_linevec_faster_4_stages.prototxt"
weightsFile = "./data/pose_iter_160000.caffemodel"

video_path = "video/input_video.mp4"
# out_path='out.mp4'
# csv_path = 'out.csv' # 비이도의 각 프레임을 파싱하고 프레임에 있는 각 관절의 좌표를 추줄하여 저장하기 위한 파일


net = cv2.dnn.readNetFromCaffe(protoFile, weightsFile)

cap = cv2.VideoCapture(video_path)
frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

ok, frame = cap.read()
(frameHeight, frameWidth) = frame.shape[:2]
# network 에 넣기 위해 전처리
inpBlob = cv2.dnn.blobFromImage(frame, 1.0 / 255, (frameWidth, frameHeight), (0, 0, 0), swapRB=False, crop=False)
# network 에 넣기
net.setInput(inpBlob)
# 결과 받아오기
output = net.forward()

H = output.shape[2]
W = output.shape[3]

print("image ID: ", len(output[0]), ", H: ", output.shape[2], ", W: ", output.shape[3])
points = []
for i in range(0, 15):
    probMap = output[0, i, :, :]

    minVal, prob, minLoc, point = cv2.minMaxLoc(probMap)

    x = (frameWidth * point[0]) / W
    y = (frameHeight * point[1]) / H

    # 키포인트 검출한 결과가 0.1보다 크면(검출한곳이 위 BODY_PARTS랑 맞는 부위면) points에 추가, 검출했는데 부위가 없으면 None으로
    if prob > 0.1:
        cv2.circle(frame, (int(x), int(y)), 3, (0, 255, 255), thickness=-1,
                   lineType=cv2.FILLED)  # circle(그릴곳, 원의 중심, 반지름, 색)
        cv2.putText(frame, "{}".format(i), (int(x), int(y)), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 1,
                    lineType=cv2.LINE_AA)
        points.append((int(x), int(y)))
    else:
        points.append(None)

# cv2.imshow("Output-Keypoints",frame)
# cv2.waitKey(0)

imageCopy = frame
for pair in POSE_PAIRS:
    partA = pair[0]
    partA = BODY_PARTS[partA]
    partB = pair[1]
    partB = BODY_PARTS[partB]

    if points[partA] and points[partB]:
        cv2.line(imageCopy, points[partA], points[partB], (0, 255, 0), 2)

cv2.imshow("Output-Keypoints", imageCopy)

cv2.waitKey(0)
cv2.destroyAllWindows()

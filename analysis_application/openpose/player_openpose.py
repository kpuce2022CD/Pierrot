import cv2

# 각 파일 path
protoFile = "pose_deploy_linevec.prototxt"
weightsFile = "pose_iter_440000.caffemodel"
count=0

# 위의 path에 있는 network 불러오기
net = cv2.dnn.readNetFromCaffe(protoFile, weightsFile)

# video capture하기
cap = cv2.VideoCapture("video_cut.mp4")

ret, image = cap.read()
# Dividing the original video in 4 parts by slicing the frame array
while True :
    photo = cap.read()[1]           # Storing the frame in a variable photo
    cropd = photo[500:,0:]       # Bottom right part of the photo [y,x]

    cv2.imshow("cropd2",cropd)     # It will show cropd2 part in a window
    #cv2.imshow("Live",photo)        # It will show complete video in a window
    if cv2.waitKey(50) == 13 :      # Specifying (Enter) button to break the loop
        break
cv2.destroyAllWindows()            # To destroy all windows


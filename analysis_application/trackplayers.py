# from PIL import Image, ImageDraw
# from matplotlib import pyplot
# from collections import deque
# import os
# import tensorflow as tf
import numpy as np
from collections import OrderedDict  # 순서를 보장받기 위해서
from scipy.spatial import distance as dist  # ??
import cv2


def binary(x):
    # transform an image in black and white
    if x == 0:
        return 0
    else:
        return 255


############## 해석 필요 ####################
def update_boxes(box):
    x = box[0]
    y = box[1]
    w = box[2]
    h = box[3]
    return x, y, x + w, y + h


############## 해석 필요 ####################
def remove_ball_boy(detected_person_img, lower_col, upper_col):
    # compute pixel percentage of a range of color (lower_col, upper_col)
    # in each box to detect ball boys/girls
    mask = cv2.inRange(detected_person_img, lower_col, upper_col)
    img = cv2.bitwise_and(detected_person_img, detected_person_img, mask=mask)
    func = np.vectorize(binary)
    img = func(img).astype(np.uint8)

    n_pix = img.shape[0] * img.shape[1]
    n_pix_bb = sum(img.flatten()) / img.shape[2] / 255

    return n_pix_bb / n_pix


# YOLO를 포함한 CNN 모델은 여러 개의 layer를 가지고 있다.
# 그중 결과 값이 들어있는 layers만 선별해서 사용하기 위한 코드
def get_output_layer(net):
    layer_names = net.getLayerNames()
    output_layers = [layer_names[i[0] - 1] for i in net.getUnconnectedOutLayers()]
    return output_layers


############## player 위치 ####################
# outs: bolb 이미지, img: frame, confidence_threshold: 정확도, 80% 미만은 버리게 되는것(추측)
def predict_players(outs, LABELS, img, confidence_threshold=0.8):
    class_ids = []
    confidences = []
    boxes = []
    nms_threshold = 0.00000000001
    Width = img.shape[1]
    Height = img.shape[0]
    predicted_players = []
    # print("img: ",img)
    # print("outs: ",outs)
    # dataFrame = pd.DataFrame(outs)
    # print(dataFrame)

    for out in outs:
        # print("out: ",out)
        for detection in out:
            # print("2",detection)
            scores = detection[5:]
            # print("3) scores", scores)
            # np.argmax: 최대값의 인덱스 번호(색인 위치)
            class_id = np.argmax(scores)
            # print("class_id",class_id)
            confidence = scores[class_id]
            # print("confidence",confidence)
            if confidence > confidence_threshold and LABELS[class_id] == 'person':
                # print("**************")
                center_x = int(detection[0] * Width)
                center_y = int(detection[1] * Height)
                w = int(detection[2] * Width)
                h = int(detection[3] * Height)
                x = int(center_x - w / 2)
                y = int(center_y - h / 2)

                taux = remove_ball_boy(img[y:y + h, x:x + w], (27, 5, 40), (47, 40, 168))

                if taux < 0.01:
                    class_ids.append(class_id)
                    confidences.append(float(confidence))
                    boxes.append([x, y, w, h])

    # apply non-maxima suppression to suppress weak, overlapping
    # bounding boxes
    idxs = cv2.dnn.NMSBoxes(boxes, confidences, confidence_threshold, nms_threshold)
    # ensure at least one detection exists
    if len(idxs) > 0:
    # loop over the indexes we are keeping
        for i in idxs.flatten():
            # extract the bounding box coordinates
            (x, y) = (boxes[i][0], boxes[i][1])
            (w, h) = (boxes[i][2], boxes[i][3])

            predicted_players.append((x, y, w, h))

    # sometimes, two identical frames remain
    predicted_players = list(set(predicted_players))

    return predicted_players


# YOLO를 포함한 CNN 모델은 여러 개의 layer를 가지고 있다.
# 그중 결과 값이 들어있는 layers만 선별해서 사용하기 위한 코드
def get_output_layer(net):
    layer_names = net.getLayerNames()
    output_layers = [layer_names[i - 1] for i in net.getUnconnectedOutLayers()]
    return output_layers


class CentroidTracker:
    def __init__(self, maxDisappeared=300):
        self.nextObjectID = 0
        self.objects = OrderedDict()  # 추적했을 때 선수 object
        self.disappeared = OrderedDict()  # 추적하지 못한 프레임 표시?
        self.maxDisappeared = maxDisappeared  # 프레임 밖으로 나가도 인정해주는 시간

    def register(self, centroid):
        # when registering an object we use the next available object
        # ID to store the centroid
        print("register")
        self.objects[self.nextObjectID] = centroid
        self.disappeared[self.nextObjectID] = 0
        self.nextObjectID += 1

    def deregister(self, objectID):
        # to deregister an object ID we delete the object ID from
        # both of our respective dictionaries
        print("deregister")
        del self.objects[objectID]
        del self.disappeared[objectID]

    ############## 해석 필요 ####################
    def update(self, rects):
        # rects 가 비어있는지 확인
        if len(rects) == 0:
            # loop over any existing tracked objects and mark them
            # as disappeared
            # 기존 트랙킹된 object를 반복하여 사라진 것으로 표시
            for objectID in list(self.disappeared.keys()):
                print("objectID")
                self.disappeared[objectID] += 1
                # if we have reached a maximum number of consecutive
                # frames where a given object has been marked as
                # missing, deregister it
                if self.disappeared[objectID] > self.maxDisappeared:
                    self.deregister(objectID)
                # return early as there are no centroids or tracking info
                # to update
            # print("len(rects)==0", self.objects.items())
            return self.objects

        # initialize an array of input centroids for the current frame
        inputCentroids = np.zeros((len(rects), 2), dtype="int")
        # loop over the bounding box rectangles
        for (i, (startX, startY, endX, endY)) in enumerate(rects):
            # use the bounding box coordinates to derive the centroid
            cX = int((startX + endX) / 2.0)
            cY = int(endY)
            inputCentroids[i] = (cX, cY)

        # if we are currently not tracking any objects take the input
        # centroids and register each of them
        if len(self.objects) == 0:
            for i in range(0, len(inputCentroids)):
                self.register(inputCentroids[i])

        # otherwise, are are currently tracking objects so we need to
        # try to match the input centroids to existing object
        # centroids
        else:
            # grab the set of object IDs and corresponding centroids
            objectIDs = list(self.objects.keys())
            objectCentroids = list(self.objects.values())
            # compute the distance between each pair of object
            # centroids and input centroids, respectively -- our
            # goal will be to match an input centroid to an existing
            # object centroid
            D = dist.cdist(np.array(objectCentroids), inputCentroids)
            # in order to perform this matching we must (1) find the
            # smallest value in each row and then (2) sort the row
            # indexes based on their minimum values so that the row
            # with the smallest value is at the *front* of the index
            # list
            rows = D.min(axis=1).argsort()
            # next, we perform a similar process on the columns by
            # finding the smallest value in each column and then
            # sorting using the previously computed row index list
            cols = D.argmin(axis=1)[rows]

            # in order to determine if we need to update, register,
            # or deregister an object we need to keep track of which
            # of the rows and column indexes we have already examined
            usedRows = set()
            usedCols = set()
            # loop over the combination of the (row, column) index
            # tuples
            for (row, col) in zip(rows, cols):
                # if we have already examined either the row or
                # column value before, ignore it
                # val
                if row in usedRows or col in usedCols:
                    continue
                # otherwise, grab the object ID for the current row,
                # set its new centroid, and reset the disappeared
                # counter
                objectID = objectIDs[row]
                self.objects[objectID] = inputCentroids[col]
                self.disappeared[objectID] = 0
                # indicate that we have examined each of the row and
                # column indexes, respectively
                usedRows.add(row)
                usedCols.add(col)

            # compute both the row and column index we have NOT yet
            # examined
            unusedRows = set(range(0, D.shape[0])).difference(usedRows)
            unusedCols = set(range(0, D.shape[1])).difference(usedCols)

            # in the event that the number of object centroids is
            # equal or greater than the number of input centroids
            # we need to check and see if some of these objects have
            # potentially disappeared
            if D.shape[0] >= D.shape[1]:
                # loop over the unused row indexes
                for row in unusedRows:
                    # grab the object ID for the corresponding row
                    # index and increment the disappeared counter
                    objectID = objectIDs[row]
                    self.disappeared[objectID] += 1
                    # check to see if the number of consecutive
                    # frames the object has been marked "disappeared"
                    # for warrants deregistering the object
                    if self.disappeared[objectID] > self.maxDisappeared:
                        self.deregister(objectID)

            # otherwise, if the number of input centroids is greater
            # than the number of existing object centroids we need to
            # register each new input centroid as a trackable object
            else:
                for col in unusedCols:
                    self.register(inputCentroids[col])
        # return the set of trackable objects
        # print("len(rects)!=0", self.objects.items())
        return self.objects

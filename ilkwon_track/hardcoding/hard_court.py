import cv2


class hard_court:

    def __init__(self):
        pass


    #아웃라인 그리기
    def draw_court(self, frame):
        x_1 = 1379
        y_1 = 561

        x_2 = 286
        y_2 = 561

        x_3 = 1379
        y_3 = 2935

        x_4 = 286
        y_4 = 2935

        x_5 = 1243
        y_5 = 2935

        x_6 = 423
        y_6 = 2935

        x_7 = 1242
        y_7 = 2386

        x_8 = 832
        y_8 = 2386

        x_9 = 423
        y_9 = 2386

        x_10 = 1242
        y_10 = 1110

        x_11 = 832
        y_11 = 1110

        x_12 = 423
        y_12 = 1110

        x_13 = 1242
        y_13 = 561

        x_14 = 423
        y_14 = 561

        cv2.line(frame, (x_1, y_1), (x_3, y_3), (0, 0, 225), 2)
        cv2.line(frame, (x_3, y_3), (x_4, y_4), (0, 0, 225), 2)
        cv2.line(frame, (x_4, y_4), (x_2, y_2), (0, 0, 225), 2)
        cv2.line(frame, (x_1, y_1), (x_2, y_2), (0, 0, 225), 2)
        cv2.line(frame, (x_5, y_5), (x_13, y_13), (0, 0, 225), 2)
        cv2.line(frame, (x_6, y_6), (x_14, y_14), (0, 0, 225), 2)
        cv2.line(frame, (x_7, y_7), (x_9, y_9), (0, 0, 225), 2)
        cv2.line(frame, (x_10, y_10), (x_12, y_12), (0, 0, 225), 2)
        cv2.line(frame, (x_8, y_8), (x_11, y_11), (0, 0, 225), 2)


        return frame


    def play_video(self):
        return self

#
# hard_court1 = hard_court()
# hard_court1.draw_court(frame)


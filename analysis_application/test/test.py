import court_draw
import cv2
import pandas as pd

cap = cv2.VideoCapture('video_cut.mp4')

if cap is None:
    print("no")

position_xy = []
position_df = pd.read_csv('tracking_balls.csv')
position_xy = list(zip(position_df['x'], position_df['y']))
idx_df = pd.read_csv('balls_bounce.csv')
idx = list(idx_df['idx'])

balls_bounces = {'idx': [], 'x': [], 'y': [], 'court': []}

i = 0
# 바운스 연속idx 삭제
while(True):
    j = i+1
    print(i, j, idx)

    if j == len(idx):
        break

    if (idx[i]+1 == idx[j] or idx[i]+2 == idx[j]):
        while(idx[j]+1 == idx[j+1] or idx[j]+2 == idx[j+1]):
            j += 1
        while(i != j):
            del idx[i+1]
            j -= 1
    i += 1

# 바운스 idx수정
for k in range(len(idx)):
    idx[k] += 4
    balls_bounces['idx'].append(idx[k])

# 영상재생
i = 0
for i in range(len(position_xy)):
    ret, frame = cap.read()

    if not ret:
        break

    # 현재 공위치 탐색
    court_draw.court_draw(frame, position_xy[i])
    if i in idx:
        # 바운드 위치 탐색
        print(i)
        court_draw.present_bounce(frame, position_xy[i], balls_bounces)

        balls_bounces['x'].append(position_xy[i][0])
        balls_bounces['y'].append(position_xy[i][1])

    i += 1

    cv2.imshow('frame', frame)
    # cv2.waitKey(3)

# ball_bounce csv변환
df_balls_bounces = pd.DataFrame()
df_balls_bounces['idx'] = balls_bounces['idx']
df_balls_bounces['x'] = balls_bounces['x']
df_balls_bounces['y'] = balls_bounces['y']
df_balls_bounces['court'] = balls_bounces['court']
df_balls_bounces.to_csv("ball_bounces.csv")

cap.release()
cv2.destroyAllWindows()

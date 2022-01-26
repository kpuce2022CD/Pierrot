import re

from player import Player

player = Player("video/input_video.mp4", "win")
player_distance, rival_distance = player.play_video()
print(player_distance)
print(rival_distance)

# 두 선수의 좌표를 저장한 txt 파일 열어 좌표 저장
with open("coord/player_coord.txt", 'r') as file:
    player_coord_string = file.read()
with open("coord/rival_coord.txt", 'r') as file:
    rival_coord_string = file.read()

player_coord_string = re.sub("\[","",player_coord_string)
player_coord_list=player_coord_string.split("], ")
print(player_coord_list)

rival_coord_string = re.sub("\[","",rival_coord_string)
rival_coord_list=rival_coord_string.split("], ")
print(rival_coord_list)

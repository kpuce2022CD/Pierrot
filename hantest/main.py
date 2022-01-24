from player import Player

player = Player("input_video.mp4", "win")
player.play_video()

# 두 선수의 좌표를 저장한 txt 파일 열어 좌표 저장 -> list 형태로 txt 파일에 저장했기에 다시 짜야함
# with open("./coord/player_coord.txt", 'r') as file:
#     player_coord_list = file.read().splitlines()
# with open("./coord/rival_coord.txt", 'r') as file:
#     rival_coord_list = file.read().splitlines()
# print(player_coord_list)
# print(rival_coord_list)
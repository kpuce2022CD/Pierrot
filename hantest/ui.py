from tkinter import *
from tkinter import messagebox
from hantest.player import Player

def click_button_player():
    messagebox.showinfo('선수 트랙킹','확인 버튼을 누르면 선수 트랙킹을 시작합니다.\n먼저 가까운 선수를 지정한 후 상대 선수를 지정합니다.')
    player = Player("input_video.mp4", "win")
    player_distance, rival_distance = player.play_video()
    label = Label(root, text = "총 이동 거리: "+str(player_distance))
    label.pack()
    label = Label(root, text = "상대 선수의 총 이동 거리: "+str(rival_distance))
    label.pack()

root = Tk()
root.title("tennis")
root.geometry("640x480")
root.resizable(False,False)

button = Button(root, text ="선수 트랙킹", command=click_button_player)
button.pack()

root.mainloop()
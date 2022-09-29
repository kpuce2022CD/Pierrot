package com.pierrot.ateco.domain;

import java.util.ArrayList;

public class GameInfoVO {
	private String _id;
	private String video;
	private ArrayList<Integer> bounce;
	private ArrayList<Integer> player;
	private ArrayList<Integer> opponent;
	private ArrayList<Integer> ball;
	
	
	public String get_id() {
		return _id;
	}
	public void set_id(String _id) {
		this._id = _id;
	}
	public String getVideo() {
		return video;
	}
	public void setVideo(String video) {
		this.video = video;
	}
	public ArrayList<Integer> getBounce() {
		return bounce;
	}
	public void setBounce(ArrayList<Integer> bounce) {
		this.bounce = bounce;
	}
	public ArrayList<Integer> getPlayer() {
		return player;
	}
	public void setPlayer(ArrayList<Integer> player) {
		this.player = player;
	}
	public ArrayList<Integer> getOpponent() {
		return opponent;
	}
	public void setOpponent(ArrayList<Integer> opponent) {
		this.opponent = opponent;
	}
	public ArrayList<Integer> getBall() {
		return ball;
	}
	public void setBall(ArrayList<Integer> ball) {
		this.ball = ball;
	}
	
	
}

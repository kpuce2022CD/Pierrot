package com.pierrot.ateco.domain;

public class UserVO {
	private String email;
	private String passwd;
	private String name;
	private int age;
	private int weight;
	private int height;
	private boolean role;
	private String team;
	
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPasswd() {
		return passwd;
	}
	public void setPasswd(String passwd) {
		this.passwd = passwd;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public int getWeight() {
		return weight;
	}
	public void setWeight(int weight) {
		this.weight = weight;
	}
	public int getHeight() {
		return height;
	}
	public void setHeight(int height) {
		this.height = height;
	}
	public boolean isRole() {
		return role;
	}
	public void setRole(boolean role) {
		this.role = role;
	}
	public String getTeam() {
		return team;
	}
	public void setTeam(String team) {
		this.team = team;
	}
	
	@Override
	public String toString() {
		return "UserVO [email=" + email + ", passwd=" + passwd + ", name=" + name + ", age=" + age + ", weight="
				+ weight + ", height=" + height + ", role=" + role + ", team=" + team + "]";
	}
	
	
}

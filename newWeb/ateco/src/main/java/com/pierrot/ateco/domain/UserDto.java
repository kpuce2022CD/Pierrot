package com.pierrot.ateco.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
	private String email;
	private String passwd;
	private String name;
	private int age;
	private int weight;
	private int height;
	private boolean role;
	private String team;
}

package com.pierrot.ateco.persistance;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Builder
public class MemberDTO {
	private String email;
	private String passwd;
	private String name;
	private int age;
	private int wegiht;
	private int height;
	private boolean role;
	private String team;
}

package com.pierrot.ateco.domain;

import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ScoreDto {
	@Id
	private String email;
	@Id
	private int index;
	@Id
	private int setNo;
	@Id
	private int gameNo;
	@Id
	private int pointNo;
	private boolean win;
	private String server;
	private String mongoUrl;
}

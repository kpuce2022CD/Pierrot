package com.pierrot.ateco.domain;

import java.sql.Date;

import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GameDto {
	@Id
	private String email;
	@Id
	private int index;
	@Id
	private int setNo;
	private String name;
	private Date date;
	private String opponent;
	private boolean win;
	private String server;
	private String fullVideo;
}

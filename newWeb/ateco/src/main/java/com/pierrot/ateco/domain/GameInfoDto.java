package com.pierrot.ateco.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "ATeCo")
public class GameInfoDto {
	@Id
	private String id;
	@Field
	private String video;
	@Field
	private int[][] bounce;
	@Field
	private int[][] player;
	@Field
	private int[][] opponent;
	@Field
	private int[][] ball;
}

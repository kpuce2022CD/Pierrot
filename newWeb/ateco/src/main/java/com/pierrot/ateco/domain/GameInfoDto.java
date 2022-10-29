package com.pierrot.ateco.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
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
	private String video;
	private int[][] bounce;
	private int[][] player;
	private int[][] opponent;
	private int[][] ball;
}

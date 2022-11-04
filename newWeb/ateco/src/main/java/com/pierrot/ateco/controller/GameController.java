package com.pierrot.ateco.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pierrot.ateco.domain.GameDto;
import com.pierrot.ateco.repository.GameMapper;
@RestController
@RequestMapping("/games")
public class GameController {
	private GameMapper mapper;
	
	public GameController(GameMapper mapper) {
		this.mapper = mapper;
	}
	
	@PostMapping
	public void addGame(@RequestBody GameDto game) {
		mapper.insertGame(game);
	}
	
	@GetMapping("/simple")
	public GameDto getSimpleGame(@RequestParam String email) {
		GameDto game = mapper.selectSimpleGame(email);
		return game;
	}
	
	@GetMapping
	public List<GameDto> getGame(@RequestParam String email, @RequestParam int index) {
		List<GameDto> game = mapper.selectGame(email, index);
		return game;
	}
	
	@DeleteMapping
	public void deleteGame(@RequestParam String email, @RequestParam int index) {
		mapper.deleteGameByEmail(email, index);
	}
}

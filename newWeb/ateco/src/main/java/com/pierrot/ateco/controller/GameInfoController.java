package com.pierrot.ateco.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pierrot.ateco.domain.GameInfoDto;
import com.pierrot.ateco.repository.GameInfoRepository;

@RestController
@RequestMapping("/gameinfos")
public class GameInfoController {

	@Autowired
	private GameInfoRepository repository; 

	@PostMapping
	public void addGameInfo(@RequestBody GameInfoDto gameInfo) {
		repository.save(gameInfo);
	}
	
	@GetMapping
	public Optional<GameInfoDto> getGameInfo(@RequestParam("id") String id) {
		return repository.findById(id);
	}
}

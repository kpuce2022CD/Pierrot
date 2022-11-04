package com.pierrot.ateco.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pierrot.ateco.domain.ScoreDto;
import com.pierrot.ateco.repository.ScoreMapper;

@RestController
@RequestMapping("scores")
public class ScoreController {
	private ScoreMapper mapper;
	
	public ScoreController(ScoreMapper mapper) {
		this.mapper = mapper;
	}
	
	@PostMapping
	public void addScore(@RequestBody ScoreDto score) {
		mapper.insertScore(score);
	}
	
	@GetMapping("setNo")
	public List<ScoreDto> getScoreBySetNo(@RequestBody ScoreDto score){
		return mapper.selectScoreBySetNo(score);
	}
	
	@GetMapping("gameNo")
	public List<ScoreDto> getScoreByGameNo(@RequestBody ScoreDto score){
		return mapper.selectScoreByGameNo(score);
	}
	
	@DeleteMapping
	public void deleteScore(@RequestParam String email) {
		mapper.deleteScoreByEmail(email);
	}
}

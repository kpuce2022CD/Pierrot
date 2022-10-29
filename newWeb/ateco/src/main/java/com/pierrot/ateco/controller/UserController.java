package com.pierrot.ateco.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pierrot.ateco.domain.UserDto;
import com.pierrot.ateco.mapper.UserMapper;

@RestController
@RequestMapping("/users")
public class UserController {
	
	private UserMapper mapper;
	
	public UserController(UserMapper mapper) {
		this.mapper = mapper;
	}
	
	@GetMapping
	public UserDto getOneUser(@RequestParam("email") String email){
		return mapper.selectUser(email);
	}
	
	@PostMapping
	public void addUser(){
		UserDto user = new UserDto("test","test","Å×½ºÆ®",26,140,140,false, "testTeam");
		mapper.insertUser(user);
	}
	
	@DeleteMapping
	public void deleteUser(@RequestParam("email") String email) {
		mapper.deleteUser(email);
	}
	
	
}
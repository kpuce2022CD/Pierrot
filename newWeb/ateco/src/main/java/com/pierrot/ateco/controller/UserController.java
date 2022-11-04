package com.pierrot.ateco.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pierrot.ateco.domain.UserDto;
import com.pierrot.ateco.repository.UserMapper;

@RestController
@RequestMapping("/users")
public class UserController {
	
	private UserMapper mapper;
	
	public UserController(UserMapper mapper) {
		this.mapper = mapper;
	}
	
	@PostMapping("login")
	public ResponseEntity<Boolean> getOneUser(@RequestParam("email") String email,@RequestParam("passwd") String passwd){
		if (mapper.selectUser(email,passwd) != null) {
			return new ResponseEntity<Boolean>(true,HttpStatus.OK);
		}else {
			return new ResponseEntity<Boolean>(false,HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping
	public void addUser(@ModelAttribute UserDto user){
		mapper.insertUser(user);
	}
	
	@DeleteMapping
	public void deleteUser(@RequestParam("email") String email) {
		mapper.deleteUserByEmail(email);
	}
	
	
}
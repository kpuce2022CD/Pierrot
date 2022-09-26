package com.pierrot.ateco.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pierrot.ateco.service.UserService;
import com.pierrot.ateco.status.DefaultRes;
import com.pierrot.ateco.status.StatusCode;

@RestController
@RequestMapping(value="/user")
public class UserController {
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
	
	@Autowired(required=true)
	private UserService userService;
	
	@PostMapping("/login")
	public ResponseEntity login(Model model) throws Exception{
		System.out.println(model);
		return ResponsEntity();
	}
}

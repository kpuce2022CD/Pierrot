package com.pierrot.ateco.controller;

import java.nio.charset.Charset;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.pierrot.ateco.domain.UserVO;
import com.pierrot.ateco.service.UserService;
import com.pierrot.ateco.status.DefaultRes;
import com.pierrot.ateco.status.StatusCode;

@RestController
@RequestMapping(value="/user")
public class UserController {
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
	
	@Autowired(required=true)
	private UserService userService;
	
	@PostMapping("/login/{email}/{passwd}")
	public ResponseEntity<UserVO> login(@PathVariable String email,@PathVariable String passwd) throws Exception{
		UserVO user = userService.SignInUser(email,passwd);
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(new MediaType("applicatioin","json",Charset.forName("UTF-8")));
		headers.set("My-Header", "MyHeaderValue");
		return new ResponseEntity<UserVO>(user,headers,HttpStatus.OK);
	}
	
	@ResponseBody
	@GetMapping("/read")
	public UserVO read(@ModelAttribute("email") String email) throws Exception{
		UserVO user = userService.readUser(email);
		return user;
	}
}

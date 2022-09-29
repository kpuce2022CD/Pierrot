package com.pierrot.ateco.controller;

import java.nio.charset.Charset;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;

import com.pierrot.ateco.domain.UserVO;
import com.pierrot.ateco.service.UserService;

@RestController
@SessionAttributes("email")
@RequestMapping(value="/user")
public class UserController {
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
	
	@Autowired(required=true)
	private UserService userService;
	
	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody HashMap<String,String> map,Model model) throws Exception{
		logger.info("start login");
		UserVO user = userService.SignInUser(map.get("email"),map.get("passwd"));
		model.addAttribute("email",user.getEmail());
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@ResponseBody
	@GetMapping("/read")
	public UserVO read(@ModelAttribute("email") String email) throws Exception{
		logger.info("start readUser");
		UserVO user = userService.readUser(email);
//		HttpHeaders headers = new HttpHeaders();
//		headers.setContentType(new MediaType("application","json",Charset.forName("UTF-8")));
		return user;
	}
	
	@PostMapping("/signup")
	public ResponseEntity<String> signUp(@RequestBody UserVO user) throws Exception{
		logger.info("start signUp");
		userService.SignUpUser(user);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	@DeleteMapping("/")
	public ResponseEntity<String> delete(@SessionAttribute("email") String email) throws Exception{
		logger.info("start delete");
		userService.deleteUser(email);
		
		return new ResponseEntity<>(HttpStatus.OK);
		
	}
	
	@PostMapping("logout")
	public ResponseEntity<String> logout(@SessionAttribute("email") String email,SessionStatus sessionStatus) throws Exception{
		logger.info("start logout");
		logger.info(email);
		sessionStatus.setComplete();
		return new ResponseEntity<>(HttpStatus.OK);
	}
}

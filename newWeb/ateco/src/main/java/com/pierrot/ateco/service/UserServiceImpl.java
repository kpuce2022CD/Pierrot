package com.pierrot.ateco.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pierrot.ateco.domain.UserDto;
import com.pierrot.ateco.model.UserDao;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	UserDao userDao;
	
	@Override
	public void addUser(UserDto user) throws Exception {
		
	}

	@Override
	public UserDto getUser(String email) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}
	
}

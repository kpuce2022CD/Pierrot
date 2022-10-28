package com.pierrot.ateco.model;

import com.pierrot.ateco.domain.UserDto;

public interface UserDao {
	public void addUser(UserDto user) throws Exception;
	public UserDto getUser(String email) throws Exception;
}

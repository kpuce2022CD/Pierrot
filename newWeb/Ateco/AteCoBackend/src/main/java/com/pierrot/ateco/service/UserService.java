package com.pierrot.ateco.service;

import com.pierrot.ateco.domain.UserVO;

public interface UserService {
	public UserVO SignInUser(String email,String passwd) throws Exception;
	public void SignUpUser(UserVO vo) throws Exception;
	public UserVO readUser(String email) throws Exception;
}

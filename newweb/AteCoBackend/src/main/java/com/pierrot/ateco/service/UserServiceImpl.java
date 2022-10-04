package com.pierrot.ateco.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.pierrot.ateco.domain.UserVO;
import com.pierrot.ateco.persistence.UserDAO;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	private UserDAO userDAO;

	@Override
	public UserVO SignInUser(String email, String passwd) throws Exception {
		// TODO Auto-generated method stub
		UserVO user = new UserVO();
		user.setEmail(email);
		user.setPasswd(passwd);
		return userDAO.signInUser(user);
	}

	@Override
	public void SignUpUser(UserVO vo) throws Exception {
		// TODO Auto-generated method stub
		userDAO.signUpUser(vo);
	}

	@Override
	public UserVO readUser(String email) throws Exception {
		// TODO Auto-generated method stub
		return userDAO.readUser(email);
	}

}

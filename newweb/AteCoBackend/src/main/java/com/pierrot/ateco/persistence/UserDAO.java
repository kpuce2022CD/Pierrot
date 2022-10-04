package com.pierrot.ateco.persistence;

import com.pierrot.ateco.domain.UserVO;

public interface UserDAO {
	public UserVO signInUser(UserVO user) throws Exception;
	public void signUpUser(UserVO user) throws Exception;
	public UserVO readUser(String email) throws Exception;
}

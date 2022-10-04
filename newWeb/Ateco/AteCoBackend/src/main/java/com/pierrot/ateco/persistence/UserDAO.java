package com.pierrot.ateco.persistence;

import com.pierrot.ateco.domain.UserVO;

public interface UserDAO {
	public UserVO signInUser(UserVO user) throws Exception;
	public void signUpUser(UserVO user) throws Exception;
	public UserVO readUser(String email) throws Exception;
	public void deleteUser(String email) throws Exception;
	public void updateUser(Object obj,String value,String email) throws Exception;
}

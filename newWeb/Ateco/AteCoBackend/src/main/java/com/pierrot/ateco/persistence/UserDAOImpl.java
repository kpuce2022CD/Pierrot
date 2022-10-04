package com.pierrot.ateco.persistence;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.pierrot.ateco.domain.UserVO;

@Repository
public class UserDAOImpl implements UserDAO{

	@Autowired
	private SqlSession sqlSession;
	
	private static final String namespace = "com.pierrot.ateco.mappers.UserMapper";
	
	@Override
	public void signUpUser(UserVO user) throws Exception {
		sqlSession.insert(namespace+".signUpUser",user);
	}

	@Override
	public UserVO signInUser(UserVO user) throws Exception {
		return sqlSession.selectOne(namespace+".signInUser",user);
	}

	@Override
	public UserVO readUser(String email) throws Exception {
		return sqlSession.selectOne(namespace+".selectUser",email);
	}

	@Override
	public void deleteUser(String email) throws Exception {
		sqlSession.delete(namespace+".deleteUser", email);
	}

	@Override
	public void updateUser(Object obj, String value, String email) throws Exception {
		// TODO Auto-generated method stub
		
	}
	
	
	
}

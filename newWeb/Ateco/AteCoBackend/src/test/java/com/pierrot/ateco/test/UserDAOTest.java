package com.pierrot.ateco.test;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.pierrot.ateco.domain.UserVO;
import com.pierrot.ateco.persistence.UserDAO;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"file:src/main/webapp/WEB-INF/spring/root-context.xml"})
public class UserDAOTest {
	@Autowired
	private UserDAO dao;
	private static final Logger logger = LoggerFactory.getLogger(UserDAOTest.class);

	@Test
	public void testReadUser() throws Exception{
		UserVO vo;
		vo = dao.readUser("pierrot@gmail.com");
		logger.info(vo.toString());
	}
	
	@Test
	public void testAdd() throws Exception{
		UserVO vo = new UserVO();
		vo.setEmail("AteCo@gmail.com");
		vo.setPasswd("2019152");
		vo.setName("╬февдз");
		vo.setAge(25);
		vo.setWeight(70);
		vo.setHeight(180);
		vo.setTeam("pierrot");
		
		dao.signUpUser(vo);
		
	}
}

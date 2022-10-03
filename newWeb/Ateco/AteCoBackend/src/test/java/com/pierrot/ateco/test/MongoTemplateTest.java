package com.pierrot.ateco.test;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.pierrot.ateco.domain.GameInfoVO;
import com.pierrot.ateco.domain.UserVO;
import com.pierrot.ateco.service.GameInfoService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations= {"file:src/main/webapp/WEB-INF/spring/root-context.xml"})
public class MongoTemplateTest {
	
	private static final Logger logger = LoggerFactory.getLogger(UserDAOTest.class);
	
	@Autowired(required=true)
	private GameInfoService gameInfoService;
	
	@Test
	public void ReadGame() throws Exception{
		String gameInfoVO;
		gameInfoVO = gameInfoService.selectGame("test");
		logger.info(gameInfoVO.toString());
	}
	
	@Test
	public void testAdd() throws Exception{
//		GameInfoVO gameInfoVO = new GameInfoVO();
//		gameInfoVO.set_id("test");
//		gameInfoVO.setVideo("testVideo");
		
		gameInfoService.saveGame("test", "testVideo");
		
	}
}

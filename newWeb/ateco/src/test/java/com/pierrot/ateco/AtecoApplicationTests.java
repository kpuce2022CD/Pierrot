package com.pierrot.ateco;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.pierrot.ateco.domain.GameInfoDto;
import com.pierrot.ateco.repository.GameInfoRepository;

@SpringBootTest
class AtecoApplicationTests {

	@Autowired
	GameInfoRepository gameInfoRepository;

	// @Test
	// public void insertMongoDB() {
	// GameInfoDto gameInfoDto = new GameInfoDto("id",null, null, null, null, null,
	// null);
	//
	// }
}

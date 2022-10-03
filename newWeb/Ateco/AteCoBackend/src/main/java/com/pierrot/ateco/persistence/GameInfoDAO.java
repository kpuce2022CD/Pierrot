package com.pierrot.ateco.persistence;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.pierrot.ateco.domain.GameInfoVO;

@Repository
public interface GameInfoDAO extends MongoRepository<GameInfoVO,String>{
	public GameInfoVO findBy_id(String _id);
	
}

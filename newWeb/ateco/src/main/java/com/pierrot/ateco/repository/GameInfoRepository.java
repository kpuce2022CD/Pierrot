package com.pierrot.ateco.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.pierrot.ateco.domain.GameInfoDto;

public interface GameInfoRepository extends MongoRepository<GameInfoDto,Integer>{

}

package com.pierrot.ateco.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pierrot.ateco.domain.GameInfoVO;
import com.pierrot.ateco.persistence.GameInfoDAO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class GameInfoService {

    @Autowired
    GameInfoDAO gameInfoDAO;
    
    
    @Autowired
    private MongoTemplate mongoTemplate;

    public String selectGame(String _id) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            if (gameInfoDAO.findBy_id(_id) == null) {
                return String.format("user name : %s not exist!!", _id);
            } else {
                return objectMapper.writeValueAsString(gameInfoDAO.findBy_id(_id));
            }
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "ERROR";
        }
    }

    public void saveGame(String _id, String video) {

        GameInfoVO gameInfoVO = new GameInfoVO();
        gameInfoVO.set_id(_id);
        gameInfoVO.setVideo(video);

//        if (gameInfoDAO.findBy_id(_id) != null) {
//            gameInfoVO.set_id(gameInfoDAO.findBy_id(_id).get_id());
//        }
////        else {
////            log.info("[Service][insert] New name received!!");
////        }

//        gameInfoDAO.save(gameInfoVO);
        mongoTemplate.save(gameInfoVO,"ATeCo");
    }

//    
//    public void saveGame2(){
//    	mongoTemplate.save(null)
//    }
}
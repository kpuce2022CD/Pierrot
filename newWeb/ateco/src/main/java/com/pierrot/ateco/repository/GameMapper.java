package com.pierrot.ateco.repository;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import com.pierrot.ateco.domain.GameDto;

@Repository
@Mapper
public interface GameMapper {
	
	@Insert("INSERT INTO game VALUES(#{game.email},#{game.index},#{game.setNo},(select name from member where email = #{game.email}),#{game.date},#{game.oppnent}',#{game.win},#{game.server},#{game.fullVideo});")
	void insertGame(@Param("GameDto") GameDto game);
	
	@Select("SELECT DISTINCT email,`index`,opponent,date FROM game WHERE email = #{email}")
	GameDto selectSimpleGame(@Param("email") String email);
	
	@Select("SELECT * FROM game WHERE email = #{email} and `index` = #{index}")
	List<GameDto> selectGame(@Param("email") String email, @Param("index") int index);
	
	@Delete("DELETE FROM game WHERE email = #{email} and `index` = #{index}")
	void deleteGameByEmail(@Param("email") String email, @Param("index") int index);
	
}

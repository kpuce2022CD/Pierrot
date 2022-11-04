package com.pierrot.ateco.repository;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import com.pierrot.ateco.domain.ScoreDto;

@Repository
@Mapper
public interface ScoreMapper {
	
	@Insert("INSERT INTO score VALUES (#{score.email}, #{score.index}, #{score.setNo}, #{score.gameNo}, #{score.pointNo},#{score.win})")
	void insertScore(@Param("score") ScoreDto score);
	
	@Select("SELECT DISTINCT email,index,setNo,gameNo FROM score WHERE email = #{score.email} and `index` = #{score.index} and setNo = #{score.setNo}")
	List<ScoreDto> selectScoreBySetNo(@Param("score") ScoreDto score);
	
	@Select("SELECT * FROM score WHERE email = #{score.email} and `index` = #{score.index} and setNo = #{score.setNo} and gameNo = #{score.gameNo}")
	List<ScoreDto> selectScoreByGameNo(@Param("score") ScoreDto score);
	
	@Delete("DELETE FROM score WHERE email = #{email}")
	void deleteScoreByEmail(@Param("email") String email);
}

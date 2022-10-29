package com.pierrot.ateco.mapper;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import com.pierrot.ateco.domain.UserDto;

@Repository
@Mapper
public interface UserMapper {
	
	@Insert("INSERT INTO member VALUES (#{user.email}, #{user.passwd}, #{user.name}, #{user.age}, #{user.weight},#{user.height}, false, #{user.team})")
	void insertUser(@Param("user") UserDto user);
	
	@Select("SELECT * FROM member WHERE email = #{email}")
	UserDto selectUser(@Param("email") String email);
	
	@Delete("DELETE FROM member WHERE email = #{email}")
	void deleteUser(@Param("email") String email);
}

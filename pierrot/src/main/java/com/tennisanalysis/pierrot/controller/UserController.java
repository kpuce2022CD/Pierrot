//package com.tennisanalysis.pierrot.controller;
//
//import com.tennisanalysis.pierrot.model.User;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.ResponseBody;
//
//@Controller
//public class UserController {
//    @PostMapping("/auth/joinProc")
//    public @ResponseBody User joinProc(@RequestBody User user){
//        // ResponseBody는 응답을 html 이 아닌 data로 하기 위해
//        // RequestBody 를 붙여야 JSON data로 받을 수 있음
//        // Spring 에서는 web, xml 에서 필터링을 해야하는데 스프링 필터를 등록해두면
//        // 스프링필터에 ip 등 많은 데 MessageConverter가 있다.
//        // key = value 만 파싱하려고 대기하는데
//        // @RequestBody를 걸면 컨텍트 타입을 확인하고 JSON을 보면 MessageConverter로 change함
//        return user;
//    }
//}

//package com.tennisanalysis.pierrot.service;
//
//import com.tennisanalysis.pierrot.model.User;
//import com.tennisanalysis.pierrot.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//@Service
//public class UserService {
//    @Autowired
//    private UserRepository userRepository; //DI
//
//    @Transactional
//    public void signUp(User user){
////        user.setRole("ROLE_USER");
//        userRepository.save(user);
////        //원래는 exception handler를 사용해야함
////        //try catch를 잡아두면 fail이 아니라 done으로 감
////        //try catch 안하고 fail 발생시켜도 상관없지만 지금은 done로 가는 방식
////        try{
////            userRepository.save(user);
////            return 1;
////        } catch (Exception e){
////            e.getMessage();
////            return -1;
////        }
//    }
//    @Transactional(readOnly = true)
//    public User login(User user){
//        System.out.println(user);
//        return userRepository.login(user);
//    }
//}

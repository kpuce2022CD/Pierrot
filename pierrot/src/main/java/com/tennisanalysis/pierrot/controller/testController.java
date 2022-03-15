package com.tennisanalysis.pierrot.controller;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.*;

@RestController
public class testController {
    @GetMapping("/home")
    public String getHome(){
        return "Hello world!";
    }
}

package com.whitepeak.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/home/*")
public class HomeController {

    @GetMapping("test")
    public @ResponseBody String homeTest() {
        return "Spring + Maven";
    }
}
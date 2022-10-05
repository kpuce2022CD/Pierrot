package com.pierrot.atecoboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class ATeCoBootApplication {

	public static void main(String[] args) {
		SpringApplication.run(ATeCoBootApplication.class, args);
	}

	@GetMapping("/hello")
	public String Hello(@RequestParam(value="name",defaultValue="World") String name){
		return String.format("Hello %s!",name);
	}
}

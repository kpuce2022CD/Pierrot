package com.pierrot.ateco.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@Component
@ControllerAdvice
public class UserControllerAdvice {

	@ExceptionHandler(DataNotFoundException.class)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void handlerException(DataNotFoundException e){
		e.printStackTrace();
	}
	
	@ExceptionHandler(ForbiddenException.class)
	@ResponseStatus(HttpStatus.FORBIDDEN)
	public void hanlderException(ForbiddenException e) {
		e.printStackTrace();
	}
}

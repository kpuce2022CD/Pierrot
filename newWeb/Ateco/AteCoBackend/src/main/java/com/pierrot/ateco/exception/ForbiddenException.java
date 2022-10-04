package com.pierrot.ateco.exception;

public class ForbiddenException extends Exception{

	private static final long serialVersionUID= 1000L;
	
	public ForbiddenException() {
		
	}
	
	public ForbiddenException(String msg) {
		super(msg);
	}
	
	public ForbiddenException(Throwable th) {
		super(th);
	}
}

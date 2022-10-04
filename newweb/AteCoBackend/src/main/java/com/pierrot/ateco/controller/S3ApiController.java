package com.pierrot.ateco.controller;


import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.amazonaws.AmazonClientException;
import com.pierrot.ateco.service.S3Service;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
public class S3ApiController {
	private static final Logger logger = LoggerFactory.getLogger(S3ApiController.class);
    private final S3Service s3Service = new S3Service();
    
    @RequestMapping(value = "/api/upload",  method = RequestMethod.GET )
    public String uploads() throws IOException {

        return "s3/s3";
    }

    @RequestMapping(value = "/api/upload", method = RequestMethod.POST)
    public String upload(@RequestParam("file") List<MultipartFile> file, HttpServletRequest res) throws IOException, AmazonClientException, InterruptedException {
    	String user = "user";
    	String contextRoot = new HttpServletRequestWrapper(res).getRealPath("/");
       // File file = new File(contextRoot);
      //  multipartfile.transferTo(file);
      //  String fileName = file.getName();
    	for(MultipartFile a : file) {
    	//	System.out.println(a+"aaaaaaaaaaaaaaa");
    		 s3Service.upload(a, "ateco-tukorea", "video");
    	}
     
        return null;
    }
    
    
}
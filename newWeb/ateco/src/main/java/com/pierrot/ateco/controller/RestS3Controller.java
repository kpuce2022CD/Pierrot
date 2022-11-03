package com.pierrot.ateco.controller;

import com.pierrot.ateco.service.AmazonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/games/")
public class RestS3Controller {

    @Autowired
    private AmazonService amazonService;

    @PostMapping("/uploadvideo")
    public String uploadFile(@RequestPart(value = "file") MultipartFile file) {
        return this.amazonService.uploadFile(file);
    }

    @DeleteMapping("/deletevideo")
    public String deleteFile(@RequestPart(value = "url") String fileUrl) {
        return this.amazonService.deleteFileFromS3Bucket(fileUrl);
    }

    @GetMapping("/getVideoList")
    public List<String> getFileList() {
        return this.amazonService.listFiles();
    }

    @GetMapping("/csv_download/{fileName}")
    public ResponseEntity<byte[]> download(@PathVariable String fileName) throws IOException {
        return this.amazonService.getObject(fileName);
    }

}
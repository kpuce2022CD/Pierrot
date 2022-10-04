package com.pierrot.ateco.service;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.Console;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.imageio.ImageIO;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.AmazonClientException;
import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.transfer.TransferManager;
import com.amazonaws.services.s3.transfer.TransferManagerBuilder;
import com.amazonaws.services.s3.transfer.Upload;
import com.amazonaws.util.IOUtils;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j;
@Service
@Configuration
@PropertySource("classpath:config/application_s3.properties")
public class S3Service {
	//@Value("${cloud.aws.credentials.accessKey}")
	private String accessKey = "AKIAUYOGGEALIRT5BIMY";

//	@Value("${cloud.aws.credentials.secretKey}")
	private String secretKey = "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";

//	@Value("cloud.aws.s3.bucket")
	private String bucket = "ateco-tukorea";

//	@Value("cloud.aws.region")
	private String region = "ap-northeast-2";

	public String upload(MultipartFile multipartFile, String bucket, String dirName) throws IOException {
		//System.out.println();
		//for(MultipartFile a : multipartFile) {
		
        File uploadFile = convert(multipartFile)  // 파일 변환할 수 없으면 에러
                .orElseThrow(() -> new IllegalArgumentException("error: MultipartFile -> File convert fail"));
       
    
		 return upload(uploadFile, bucket, dirName);
	}

    // S3로 파일 업로드하기
    private String upload(File uploadFile, String bucket, String dirName) {
        String fileName = dirName + "/" + UUID.randomUUID() + uploadFile.getName();   // S3에 저장된 파일 이름
        String uploadImageUrl = putS3(uploadFile, bucket, fileName); // s3로 업로드
       return uploadImageUrl;
    }

    // S3로 업로드
    private String putS3(File uploadFile, String bucket, String fileName) {
    	  
        BasicAWSCredentials awsCreds = new BasicAWSCredentials(this.accessKey, this.secretKey);
        
        AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
              .withRegion(region)
              .withCredentials(new AWSStaticCredentialsProvider(awsCreds))
              .build();


        s3Client.putObject(new PutObjectRequest(bucket, fileName, uploadFile).withCannedAcl(CannedAccessControlList.PublicRead));
       return s3Client.getUrl(bucket, fileName).toString();
    }

    /**
     * @param multipartFile
     * 로컬에 파일 저장하기
     */
    private Optional<File> convert(MultipartFile multipartFile) throws IOException {
        if (multipartFile.isEmpty()) {
            return Optional.empty();
        }

        String originalFilename = multipartFile.getOriginalFilename();
        String storeFileName = createStoreFileName(originalFilename);

        //파일 업로드
        File file = new File("documents"+storeFileName);
        multipartFile.transferTo(file);

        return Optional.of(file);
    }

    /**
     * @description 파일 이름이 이미 업로드된 파일들과 겹치지 않게 UUID를 사용한다.
     * @param originalFilename 원본 파일 이름
     * @return 파일 이름
     */
    private String createStoreFileName(String originalFilename) {
        String ext = extractExt(originalFilename);
        String uuid = UUID.randomUUID().toString();
        return uuid + "." + ext;
    }

    /**
     * @description 사용자가 업로드한 파일에서 확장자를 추출한다.
     *
     * @param originalFilename 원본 파일 이름
     * @return 파일 확장자
     */
    private String extractExt(String originalFilename) {
        int pos = originalFilename.lastIndexOf(".");
        return originalFilename.substring(pos + 1);
    }
}
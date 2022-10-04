
<%@ page session="false" %>
<%@ page language="java" pageEncoding="UTF-8"
   contentType="text/html; charset=UTF-8"%>
   
<html>
<head>
	<title>S3</title>
</head>
<body>
<h1>
	AWS s3  
</h1>
<form action="/ateco/api/upload"  method="post" enctype="multipart/form-data">
		파일 선택 : <input type="file" name="file" multiple>
		<input type="submit" value="전송">
	</form>
	<br><hr><br> 
</body>
</html>

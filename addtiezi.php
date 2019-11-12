<?php
header('content-type:text/html;charset=utf-8');
$arr=json_decode(file_get_contents('php://input'),true);
if(!empty($arr)){
	$author=$arr['author'];
	$title=$arr['title'];
	$face=$arr['face'];
	$content=$arr['content'];
	$conn=@mysql_connect("localhost","root","") or die("error");
	mysql_select_db("messagebyl",$conn);
	mysql_query("set names utf8");
	mysql_query("update");
	$flag=mysql_query("insert into message0404(author,title,content,face,addTime) values('$author','$title','$content','$face',now())");
	if($flag){
		echo '{"status":"10001","mess":"发帖成功"}';
	}else{
		echo '{"status":"20001","mess":"发帖失败"}';
	}
}
?>

<?php
$messageId=$_POST['messageId'];
$reply=$_POST['reply'];
if(!empty($messageId)){
	$conn=@mysql_connect('localhost','root','') or die ('error');
	mysql_select_db("messagebyl",$conn);
	mysql_query("set names utf8");
	$flag=mysql_query("update message0404 set reply='$reply' where messageId='$messageId'");
	if($flag){
		echo '{"status":"10001","mes":"回复成功"}';
	}
}else{
	header("location:index.html");
}
?>
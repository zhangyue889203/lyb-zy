<?php
$messageId=$_POST['messageId'];
if(!empty($messageId)){
	$conn=@mysql_connect('localhost','root','') or die ('error');
	mysql_select_db("messagebyl",$conn);
	mysql_query("set names utf8");
	$flag=mysql_query("delete from message0404 where messageId='$messageId'");
	if($flag){
		echo '{"status":"10001","mes":"删除成功"}';
	}
}
?>
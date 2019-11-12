<?php
session_start();
ob_start();
$adminName=$_POST['userName'];
$adminPwd=$_POST['pwd'];
if(!empty($adminName) and !empty($adminPwd)){
	$conn=@mysql_connect("localhost","root","") or die("error");
	mysql_select_db("messagebyl",$conn);
	mysql_query("set names utf8");
	$rs=mysql_query("select * from admin0404 where adminName='$adminName' and adminPwd='$adminPwd'");
	$num=mysql_num_rows($rs);
	if($num==1){
		setcookie("sessionid",session_id());
		setcookie("username",$adminName);
		setcookie(md5("login"),md5("success".$adminName.session_id()));
		header("location:setcookie.php");
	}else{
		echo '{"status":"20001","mes":"账户名或者密码错误"}';
	}
}
?>
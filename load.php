<?php
header("content-type:text/html;charset=utf-8");
if($_SERVER['REQUEST_METHOD']=='POST'){
$conn=@mysql_connect("localhost","root","") or die("error");
mysql_select_db("messagebyl",$conn);
mysql_query("set names utf8");
/*获取结果集对象 并按时间降序的顺序输出*/
$info=mysql_query("select * from message0404 order by addTime desc");
/*创建一个数组准备接受数据*/
$dataArr=array();
if($info){
	/*$rs=mysql_fetch_array($info,MYSQL_ASSOC)*/
	while($rs=mysql_fetch_array($info,MYSQL_ASSOC)){
		array_push($dataArr,$rs);
	}
}
// echo json_encode($dataArr);
$echoarr=array('status'=>'10001','data'=>$dataArr);
echo json_encode($echoarr);
}
?>
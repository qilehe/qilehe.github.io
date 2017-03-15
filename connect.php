 <?php 
 echo 'try to connect';
$link = mysqli_connect('jiajunshencom.ipagemysql.com', 'jiajunshen', '12345678'); 
if (!$link) { 
    die('Could not connect: ' . mysql_error()); 
} 
echo 'Connected successfully'; 
mysql_select_db(jiajun); 
?> 
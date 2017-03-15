<?php

// Check for empty fields
if(empty($_POST['name'])  		||
   empty($_POST['email']) 		||
   empty($_POST['phone']) 		||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
	     echo "No arguments Provided!";
	     return false;
   }
  
  $name = $_POST['name'];
  $email_address = $_POST['email'];
  $phone = $_POST['phone'];
  $message = $_POST['message'];

  //email to us
  $to = 'cheererhe@gmail.com'; 
  $email_subject = "Photography Inquiry: $name";
  $email_body = "You have received a new message.\n\n.Here are the details:\n\nName: $name\n\nEmail: $email_address\n\nPhone: $phone\n\n Message:$message";
  $headers = "From: cheererhe@gmail.com\n"; 
  $headers .= "Reply-To: $email_address";	
  $result = mail($to,$email_subject,$email_body,$headers);
  echo $result;

  return true;			
?>
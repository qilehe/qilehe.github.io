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
  	
  //email to us
  $to = 'qilehe.work@gmail.com'; // Add your email address inbetween the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
  $email_subject = "Photography Inquiry: $name";
  $email_body = "You have received a new message.\n\n.Here are the details:\n\nName: $name\n\nEmail: $email_address\n\nPhone: $phone\n\n Message:$message";
  $headers = "From: qilehe.work@gmail.com\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
  $headers .= "Reply-To: $email_address";	
  mail($to,$email_subject,$email_body,$headers);

  //confirmation email to user
  $email_subject = "Qile Photography confirmation";
  $email_body = "Dear $name,\n\nYou have successfully submitted your inquiry to Qile Photography!\n\n
  Name: $name\n\nEmail: $email_address\n\nPhone: $phone\n\nMessage:$message\n\nFor more information, please go to qilehe.github.io\n\nBest,\n\nQile He";
  $headers = "From: qilehe.work@gmail.com\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
  $headers .= "Reply-To: qilehe.work@gmail.com";
  mail($email_address,$email_subject,$email_body,$headers);
  return true;			
?>
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
$accommodation =  $_POST['accommodation'];
$guestNumber = $_POST['guestNumber'];
$guestNames = $_POST['guestNames'];

//establish connection
$link = mysqli_connect('jiajunshencom.ipagemysql.com', 'jiajunshen', '12345678'); 
if (!$link) { 
    die('Could not connect: ' . mysql_error()); 
    return false;
} 
//select db
$db_selected = mysqli_select_db($link,'jiajun');
if (!$db_selected) {
    die ('Can\'t use jiajun : ' . mysql_error());
    return false;
}
//run query
$sql = "INSERT INTO Persons (name, email, phone, guestNumber, guestNames, accommodation, message)
VALUES ('$name', '$email_address', '$phone', '$guestNumber', '$guestNames', '$accommodation', '$message');";
if ($link->query($sql) === TRUE) {
    // echo "New record created successfully";
  ;
} else {
    echo "Error: " . $sql . "<br>" . $link->error;
    return false;
}
$link->close();
	
//email to us
$to = 'wedding@jiajunshen.com'; // Add your email address inbetween the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
$email_subject = "Wedding RSVP Form: $name";
$email_body = "You have received a new message from wedding RSVP form.\n\n"."Here are the details:\n\nName: $name\n\nEmail: $email_address\n\nPhone: $phone\n\n Number of Guests: $guestNumber\n\nGuests names: $guestNames\n\nNeed accommodation?: $accommodation\n\nSpecial request for food:$message";
$headers = "From: noreply@jiajunshen.com\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
$headers .= "Reply-To: $email_address";	
mail($to,$email_subject,$email_body,$headers);

//confirmation email to user
// Add your email address inbetween the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
$email_subject = "Qile He & Jiajun Shen Wedding RSVP Confirmation";
$email_body = "Dear $name,\n\nYou have successfully submitted your RSVP request to Qile He & Jiajun Shen's wedding!\n\n
Name: $name\n\nEmail: $email_address\n\nPhone: $phone\n\nNumber of Guests: $guestNumber\n\nGuests names: $guestNames\n\nNeed accommodation?: $accommodation\n\nSpecial request for food:$message\n\nFor more information, please go to qilehe.jiajunshen.com\n\nBest,\n\nQile He & Jiajun Shen";
$headers = "From: noreply@jiajunshen.com\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
$headers .= "Reply-To: info@jiajunshen.com";
mail($email_address,$email_subject,$email_body,$headers);

return true;			
?>
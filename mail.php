<?php

  
   
if(isset($_GET["subscribe"]) && $_GET["subscribe"]=true){
    $email= $_POST["email"];
    $text="User subscription";
    $phone="";
    $name="web subscription";
    $email="";
    $website="";
     sendMail($name,$email,$phone,$text,$website);

}

if(isset($_GET["webform"]) && $_GET["webform"]=true){
    
    $name = $_POST["name"];
    $email= $_POST["email"];
    $text= $_POST["message"];
    $phone= $_POST["phone"];
    $website= $_POST["website"];

    sendMail($name,$email,$phone,$text,$website);


}


function sendMail($name,$email,$phone,$text,$website){
 $to = 'info@fourbic.com';

    $headers = 'MIME-Version: 1.0' . "\r\n";
    $headers .= "From: " . $email . "\r\n"; // Sender's E-mail
    $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

    $message ='<table style="width:100%">
        <tr>
            <td>'.$name.'</td>
        </tr>
        <tr><td>Email: '.$email.'</td></tr>
        <tr><td>Website: '.$website.'</td></tr>
        <tr><td>phone: '.$phone.'</td></tr>
        <tr><td>Text: '.$text.'</td></tr>
    </table>';

    if (@mail($to, $email, $message, $headers))
    {
        //echo json_encode(["message"=>'The message has been sent.']);
        echo 'The message has been sent.';
    }else{
         //echo json_encode(["message"=>'failed']);
        echo 'failed submitting message. Try again later.';
    }
};

?>

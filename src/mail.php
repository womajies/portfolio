<?php
// phpmailer files
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

$title = "Client Message";

$c = true;
// The formation of the letter itself
foreach ( $_POST as $key => $value ) {
  if ( $value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject" ) {
    $body .= "
    " . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
      <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
      <td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
    </tr>
    ";
  }
}

$body = "<table style='width: 100%;'>$body</table>";

// Settings PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
  $mail->isSMTP();
  $mail->CharSet = "UTF-8";
  $mail->SMTPAuth   = true;

  // Settings our email
  $mail->Host       = 'smtp.yandex.ru'; // SMTP server our email
  $mail->Username   = 'magomedov.html@yandex.ru'; // login email
  $mail->Password   = 'ykozubczvxddhpdn'; // pass email
  $mail->SMTPSecure = 'ssl';
  $mail->Port       = 465;

  $mail->setFrom('magomedov.html@yandex.ru', 'Letter from vipdeveloper'); // addres email and name of sender

  // recipient letter
  $mail->addAddress('magomedov.html@yandex.ru');

  // Send message
  $mail->isHTML(true);
  $mail->Subject = $title;
  $mail->Body = $body;

  $mail->send();

} catch (Exception $e) {
  $status = "The message was not sent. The reason for the error: {$mail->ErrorInfo}";
}

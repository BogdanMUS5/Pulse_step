<?php
// Включаем отображение ошибок PHP
ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once('phpmailer/PHPMailerAutoload.php');

$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// =======================
// Настройки SMTP Яндекса
// =======================
$mail->isSMTP();
$mail->Host       = 'smtp.mail.ru';
$mail->SMTPAuth   = true;
$mail->Username   = 'bmysnik@internet.ru';   // твой ящик
$mail->Password   = 'q0l2tZVokezY2q7c5VNk';         // пароль приложения (НЕ обычный!)
$mail->SMTPSecure = 'ssl';                      // или 'tls'
$mail->Port       = 465;                        // если 'tls', то 587

// =======================
// Отладка
// =======================
$mail->SMTPDebug  = 2;            // уровень отладки (2 = сервер+клиент)
$mail->Debugoutput = 'html';      // вывод прямо на страницу

// =======================
// Письмо
// =======================
$mail->setFrom('bmysnik@internet.ru', 'Pulse'); 
$mail->addAddress('mysnikbogdan3@gmail.com');   // получатель (попробуй сначала Gmail/Яндекс!)

$mail->isHTML(true);
$mail->Subject = 'Тест PHPMailer';
$mail->Body    = 'Привет! Это тестовое письмо через <b>PHPMailer + Яндекс</b>.';

// =======================
// Отправка и результат
// =======================
if (!$mail->send()) {
    echo "<h3 style='color:red'>SEND: FAIL</h3>";
    echo "ErrorInfo: <pre>" . htmlspecialchars($mail->ErrorInfo) . "</pre>";
} else {
    echo "<h3 style='color:green'>SEND: OK</h3>";
}

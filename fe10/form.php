<?php
error_reporting(0);
$mail = "poshtar.boba@gmail.com";
$message = "<h2>Повідомлення з сайта \"Бла-бла-бла\":
    ".$_POST['hahaha']." (форма ".$_POST['hide'].")</h2><hr>
    <p><strong>ПІП:</strong> ".$_POST['lolazaza']."</p>
    <p><strong>Телефон:</strong> ".$_POST['privet']."</p>";
$subject="Повідомлення з сайта \"Бла-бла-бла\"";
mail($mail, $subject, $message, "Content-type: text/html; charset=utf-8 \r\n");
echo "Done <b>42</b>";
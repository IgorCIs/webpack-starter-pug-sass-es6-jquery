<?php
    $message = "Имя: " . $_POST["name"] .
    "\n Телефон: " . $_POST["tel"];
    mail('motheadpross@gmail.com', 'zelda', $message);
    echo $message;
?>
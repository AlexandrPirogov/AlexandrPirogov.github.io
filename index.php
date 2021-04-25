<?php
mb_internal_encoding("UTF-8");
function my_autoloader($class) {
    if(file_exists('./Classes/' . $class . '.php')){
        require_once './Classes/' . $class . '.php';
    } else if ('./Controllers/' . $class . '.php') {
        require_once './Controllers/' . $class . '.php';
    }
}

spl_autoload_register('my_autoloader');
require_once './Routes.php';
?>


<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./View/Style/template.css">
    <link rel="stylesheet" href="./../View/Style/template.css">
    <title>Document</title>
</head>
<body>
</body>
</html>


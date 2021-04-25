<?php
require_once './Scripts/Auth.php';
require_once './View/template.php';
if(checkUser()){
    header("Location: feed");
}
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div class="Form">
        <form action="login" method="post">
            <div>
                <input type="text" placeholder="Login..." name="lgn">
            </div>
            <div>
                <input type="password" placeholder="Password..." name="pwd">
            </div>
            <div>
                <input type="submit" value="Sign In">
            </div>
        </form>
    </div>
</body>
</html>



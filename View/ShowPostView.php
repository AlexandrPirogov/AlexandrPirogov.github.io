<?php
    $title = '';
    $text = '';
    if(isset($_GET['id'])){
        $id = $_GET['id'];
        require_once './Scripts/db_config.php';
        $post = pg_fetch_row(pg_query("select * from pirogovblog.posts where id = $id"));
        global $title;
        global $text;
        $text= $post[1];
        $title = $post[2];
    }

?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="./View/Style/template.css">
    <title>Document</title>
</head>
<body>
    <div class="ShowPost">
        <div class="PostHeader">
            <h1><?php echo $title?></h1>
        </div>
        <div class="Intro">
            <?php echo $text?>
        </div>
    </div>

</body>
</html>

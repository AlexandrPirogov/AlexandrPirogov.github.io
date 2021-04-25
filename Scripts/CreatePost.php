<?php
        if (isset($_POST['title']) && isset($_POST['text'])) {
            require_once './db_config.php';
            $title = $_POST['title'];
            $text = $_POST['text'];
            pg_query("insert into pirogovblog.posts values(default, '$text', '$title')");
            header("Location: /feed");
    }

<?php
        echo "<div id='PostContainer'>
        <div class='Post'>
            <div class='PostHeader'>
                <h1>Post1</h1>
            </div>
            <div class='Intro'>
                Here intro text
            </div>
        </div>
        <div class='Post'>
            <div class='PostHeader'>
                <h1>Post1</h1>
            </div>
            <div class='Intro'>
                Here intro text
            </div>
        </div>
        <div class='Post'>
            <div class='PostHeader'>
                <h1>Post1</h1>
            </div>
            <div class='Intro'>
                Here intro text
            </div>
        </div>
        <div class='Post'>
            <div class='PostHeader'>
                <h1>Post1</h1>
            </div>
            <div class='Intro'>
                Here intro text
            </div>
        </div>
        <div class='Post'>
            <div class='PostHeader'>
                <h1>Post1</h1>
            </div>
            <div class='Intro'>
                Here intro text
            </div>
        </div>
        <div class='Post'>
            <div class='PostHeader'>
                <h1>Post1</h1>
            </div>
            <div class='Intro'>
                Here intro text
            </div>
        </div>
    </div>";
require_once './Scripts/db_config.php';
$db_connection = pg_connect("host=localhost port=8090 user=$username password=$password");
$res = pg_query($db_connection, "select * from pirogovblog.users u ;");
while($row = pg_fetch_row($res)){
    echo $row[1];
}

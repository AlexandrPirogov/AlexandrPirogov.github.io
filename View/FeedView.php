
<?php
require_once './View/template.php';
require_once './Scripts/db_config.php';

$result = pg_query($db_connection, "select id, LEFT(text, 50), title  from pirogovblog.posts");
 echo "<div id='PostContainer'>";
while ($row = pg_fetch_row($result)){
    echo "<div class='Post'>
                <div class='PostHeader'>
                    <h1><a href='showpost?id=$row[0]'>Id: $row[0] $row[2]</a></h1>
                </div>
                <div class='Intro'>
                      $row[1]
                </div>
            </div>";
}


echo "</div>";
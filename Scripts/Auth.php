<?php
function checkuser(){
    if(isset($_POST['lgn']) && isset($_POST['pwd'])) {
        require_once './Scripts/db_config.php';

        $lgn = $_POST['lgn'];
        $pwd = crypt($_POST['pwd'], 'bcsfghsf5');

        $usersCountQuery = pg_query("select count(id) from pirogovblog.users where login = '$lgn' and pswrd = '$pwd'");
        $usercount = pg_fetch_row($usersCountQuery);

        if ($usercount[0] == 1)
            return true;

        return false;
    }
}
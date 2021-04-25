<?php
    Route::set('AboutUs', function(){
        echo "<h1>AboutUs</h1>";
    });

    Route::set('createpost', function(){
        Controller::CreateView("CreatePost");
    });

    Route::set('feed', function(){
        Controller::CreateView("Feed");
    });

    Route::set("/CreatePost.php", function (){
        print_r($_POST);
    });

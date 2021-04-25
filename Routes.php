<?php
    Route::set('', function(){
        Controller::CreateView('Default');
    });

    Route::set('showpost', function(){
        Controller::CreateView("ShowPost");
    });


    Route::set('createpost', function(){
        Controller::CreateView("CreatePost");
    });

    Route::set('feed', function(){
        Controller::CreateView("Feed");
    });

    Route::set("createPost.php", function (){
    });

    Route::set("login", function(){
        Controller::CreateView("Login");
    });



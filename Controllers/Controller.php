<?php


class Controller
{
    public static function CreateView($viewName){
        require_once("./View/".$viewName."View.php");
    }

}
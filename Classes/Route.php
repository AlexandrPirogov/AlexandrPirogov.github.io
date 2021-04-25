<?php


class Route
{
        public static $Routes = array();

        public static function set($route, $callback){
            self::$Routes = $route;
            if($_GET['url']==$route){
                $callback->__invoke();
            }

        }
}
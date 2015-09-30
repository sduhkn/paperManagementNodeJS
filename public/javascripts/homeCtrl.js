/**
 * Created by Administrator on 2015/9/29.
 */
var home = angular.module("home", ['ui.router']);

home.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when("", "/page1");
    $stateProvider
        .state("page1", {
            url:"/page1",
            templateUrl: "./angular/Page1.ejs"
        })
        .state("page2", {
            url:"/page2",
            templateUrl: "./angular/Page2.ejs"
        })
        .state("page3", {
            url:"/page3",
            templateUrl: "./angular/Page3.ejs"
        });
});
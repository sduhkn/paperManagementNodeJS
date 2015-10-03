/**
 * Created by Administrator on 2015/10/3.
 */
var loginCtrl = angular.module("loginCtrl", ['ui.router']);

loginCtrl.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when("", "/page1");
    $stateProvider
        .state("page1", {
            url:"/page1",
            templateUrl: "./public/angular/Page1.ejs"
        })
        .state("page2", {
            url:"/page2",
            templateUrl: "./public/angular/Page2.ejs"
        })
        .state("page3", {
            url:"/page3",
            templateUrl: "./public/angular/Page3.ejs"
        });
});
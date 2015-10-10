/**
 * Created by Administrator on 2015/9/29.
 */
var home = angular.module("home", ['ui.router']);

home.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("", "/page1");
    $stateProvider
        .state("page1", {
            url:"/page1",
            templateUrl: "./views/stu/Page1.ejs",
        })
        .state("page2", {
            url:"/page2",
            templateUrl: "./views/stu/Page2.ejs"
        })
        .state("page3", {
            url:"/page3",
            templateUrl: "./views/stu/Page3.ejs"
        });
});
home.controller('stu_showPaperInfo',function($scope,$http){
    $http.get('/myPaperInfo')
        .success(function(data, status){
            $scope.paperInfo = data.paperInfo;
        }).error(function(data, status){
            alert("error: "+status);
        });
});
//控制菜单点击样式
home.controller('navbar',function($scope){
    $("li[name='myli']").click(function(){
        $(this).addClass("active").siblings('li').removeClass("active");
    });
});
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
        })
        .state("page4", {
            url:"/page4",
            templateUrl: "./views/stu/Page4.ejs"
        });
});
home.controller('stu_showPaperInfo',function($scope,$http){
    $http.get('/myPaperInfo')
        .success(function(data, status){
            $scope.paperInfo = data.paperInfo;
        }).error(function(data, status){
            alert("error: "+status);
        });

    $scope.edit = function(paper){

    }
});
//控制菜单点击样式
home.controller('navbar',function($scope){
    $("li[name='myli']").click(function(){
        $(this).addClass("active").siblings('li').removeClass("active");
    });
});
home.controller('stuOwnInfo',function($scope,$http){
    $http.get('/stuOwnInfo')
        .success(function(data, status){
            console.log(data.paperInfo.sid);
            $scope.sid=data.paperInfo.sid;
            $scope.sex=data.paperInfo.sex;
            $scope.sname=data.paperInfo.sname;
        })
        .error(function(data, status){
            alert("error: "+status);
        });
});
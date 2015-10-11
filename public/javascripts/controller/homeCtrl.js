/**
 * Created by Administrator on 2015/9/29.
 */
var home = angular.module("home", ['ui.router']);

home.factory('paperService',function(){
    var paperInfo = {};
    function setPaperInfo(paper) {
        paperInfo = paper;
    }
    function getPaperInfo() {
        return paperInfo;
    }

    return {
        setPaperInfo: setPaperInfo,
        getPaperInfo: getPaperInfo
    }
});
//ctrl the routes
home.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("", "/showMyPaper");
    $stateProvider
        .state("showMyPaper", {
            url:"/showMyPaper",
            views:{
                '':{
                    templateUrl: "./views/stu/showMyPaper.ejs",
                }
            }
        })
        .state("editPaper",{
            url:'/editPaper',
            templateUrl: './views/stu/editPaper.ejs',
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
//show the paper info
//showMyPaper.ejs
home.controller('stu_showPaperInfo',['$scope','$http','paperService',function($scope,$http,paperService){
    $http.get('/stu/myPaperInfo')
        .success(function(data, status){
            $scope.paperInfo = data.paperInfo;
        }).error(function(data, status){
            alert("error: "+status);
        });

    $scope.editPaper = function(paper){
        paperService.setPaperInfo(paper);
    }
}]);
//edit and update the paper info
//editPaper.ejs
home.controller('editPaperInfo',['$scope','paperService',function($scope,paperService){
    $scope.paper = paperService.getPaperInfo();
}]);
//ctrl css style of the right menu
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
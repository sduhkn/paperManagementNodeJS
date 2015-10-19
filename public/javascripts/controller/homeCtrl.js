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
home.controller('stuOwnInfo', function ($scope, $http) {

    $http.get('/stu/myPaperInfo')
        .success(function (data, status) {
            $scope.paperInfo = data.paperInfo;
        }).error(function (data, status) {
            alert("error: " + status);
        });

    $scope.updateStudent = function () {
        $http.post("/updateStuInfo", {sid: $scope.sid, sex: $scope.sex,
            sname: $scope.sname,school: $scope.school,major: $scope.major,
            tid: $scope.tid,gschool: $scope.gschool})
            .success(function (data, status) {
                alert(data);
            })
            .error(function (data, status) {
                alert("error: " + status);
            });
    }
    $http.get('/stuOwnInfo')
        .success(function (data, status) {
            console.log(data.studentInfo.sid);
            $scope.sid = data.studentInfo.sid;
            $scope.sex = data.studentInfo.sex;
            $scope.sname = data.studentInfo.sname;
            $scope.content = data.studentInfo.content;
            $scope.school = data.studentInfo.school;
            $scope.major = data.studentInfo.major;
            $scope.enrolldate = data.studentInfo.enrolldate;
            $scope.tid = data.studentInfo.tid;
            $scope.gschool = data.studentInfo.gschool;

        })
        .error(function (data, status) {
            alert("error: " + status);
        });
});
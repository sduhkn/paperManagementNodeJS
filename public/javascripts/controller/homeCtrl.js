/**
 * Created by Administrator on 2015/9/29.
 */
var home = angular.module("home", ['ui.router']);

home.factory('paperService', function () {
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
            url: "/showMyPaper",
            views: {
                '': {
                    templateUrl: "./views/stu/showMyPaper.ejs",
                }
            }
        })
        .state("editPaper", {
            url: '/editPaper',
            templateUrl: './views/stu/editPaper.ejs',
        })
        .state("page2", {
            url: "/page2",
            templateUrl: "./views/stu/Page2.ejs"
        })
        .state("page3", {
            url: "/page3",
            templateUrl: "./views/stu/Page3.ejs"
        })
        .state("page4", {
            url: "/page4",
            templateUrl: "./views/stu/Page4.ejs"
        });
});
//show the paper info
//showMyPaper.ejs
home.controller('stu_showPaperInfo', ['$scope', '$http', 'paperService', function ($scope, $http, paperService) {
    $http.get('/stu/myPaperInfo')
        .success(function (data, status) {
            $scope.paperInfo = data.paperInfo;
        }).error(function (data, status) {
            alert("error: " + status);
        });
    $scope.editPaper = function (paper) {
        paperService.setPaperInfo(paper);
    }
}]);
//edit and update the paper info
//editPaper.ejs
home.controller('editPaperInfo', ['$scope', '$http', 'paperService', function ($scope, $http, paperService) {
    $scope.paper = paperService.getPaperInfo();
    $scope.updatePaperInfo = function () {
        $http.post('/stu/updatePaperInfo', {
            publish: $scope.paper.publish, paperid: $scope.paperid
        })
            .success(function (data, status) {
                alert(data.msg);
            })
            .error(function (data, status) {
                alert("error: " + status);
            });
    }
}]);
//ctrl css style of the right menu
home.controller('navbar', function ($scope) {
    $("li[name='myli']").click(function () {
        $(this).addClass("active").siblings('li').removeClass("active");
    });
});
home.controller('stuOwnInfo', function ($scope, $http) {
    $http.get('/stu/stuOwnInfo')
        .success(function (data, status) {
            $scope.sex = data.stuInfo.sex;
            $scope.sname = data.stuInfo.sname;
            $scope.stuSex = [{sex: '男'}, {sex: '女'}];
            $scope.stu = {sex: data.stuInfo.sex};
        })
        .error(function (data, status) {
            alert("error: " + status);
        });
    $scope.updateStuInfo = function () {
        $http.post('/stu/updateStuInfo', {
            sex: $scope.stu.sex, sname: $scope.sname
        })
            .success(function (data, status) {
                alert(data.msg);
            })
            .error(function (data, status) {
                alert("error: " + status);
            });
    }
});
home.controller('changePassword', function ($scope, $http) {
    $scope.checkForm = function () {
        if ($scope.newPwd1 != $scope.newPwd2) {
            alert("新密码不一致");
        } else {
            if ($scope.oldPwd == $scope.newPwd1) {
                alert("新旧密码不能相同");
            }
            else {
                if ($scope.newPwd1.length < 6) {
                    alert("密码须不少于六位");
                }
                else {
                    $http.post('/stu/changePassword', {
                        oldPwd: $scope.oldPwd, newPwd: $scope.newPwd1
                    })
                        .success(function (data, status) {
                            alert(data.msg);
                        })
                        .error(function (data, status) {
                            alert("error: " + status);
                        });
                }
            }
        }

    }
});
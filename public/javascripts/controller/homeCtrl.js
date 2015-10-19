/**
 * Created by Administrator on 2015/9/29.
 */
var home = angular.module("home", ['ui.router']);

home.directive('formatDate', function(){
    return {
        require: 'ngModel',
        link: function(scope, elem, attr, ngModelCtrl) {
            ngModelCtrl.$formatters.push(function(modelValue){
                if(modelValue) {
                    return new Date(modelValue);
                }
            });

            ngModelCtrl.$parsers.push(function(value){
                if(value) {
                    return $filter('date')(value, 'yyyy-MM-dd');
                }
            });
        }
    };
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
home.controller('stu_showPaperInfo', ['$scope', '$http', '$window', function ($scope, $http, $window) {
    $http.get('/stu/myPaperInfo')
        .success(function (data, status) {
            $scope.paperInfo = data.paperInfo;
        }).error(function (data, status) {
            alert("error: " + status);
        });

    $scope.editPaper = function (paper) {
        $window.sessionStorage.setItem('paper',JSON.stringify(paper));
    };
}]);
//edit and update the paper info
//editPaper.ejs
home.controller('editPaperInfo', function ($scope, $http, $window,$state) {
    if($window.sessionStorage.getItem('paper')){
        var editPaperInfo = JSON.parse($window.sessionStorage.getItem('paper'));
        $scope.paper = editPaperInfo;
        $scope.paper.pubdate = new Date(editPaperInfo.pubdate);
    }else {
        $state.go('showMyPaper');
    }
    $scope.updatePaperInfo = function () {
        $http.post('/stu/updatePaperInfo', {
            paper: $scope.paper
        })
            .success(function (data, status) {
                alert(data.msg);
            })
            .error(function (data, status) {
                alert("error: " + status);
            });
    }
});
//ctrl css style of the right menu
home.controller('navbar', function ($scope) {
    $("li[name='myli']").click(function () {
        $(this).addClass("active").siblings('li').removeClass("active");
    });
});
home.controller('stuOwnInfo', function ($scope, $http) {
    $http.get('/stu/stuOwnInfo')
        .success(function (data, status) {
            $scope.stuSex = [{sex: '男'}, {sex: '女'}];
            $scope.stu = {sex: data.stuInfo.sex,sname:data.stuInfo.sname};
        })
        .error(function (data, status) {
            alert("error: " + status);
        });
    $scope.updateStuInfo = function () {
        $http.post('/stu/updateStuInfo', {
            stu: $scope.stu,
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
        if ($scope.pwd.new1 != $scope.pwd.new2) {
            alert("新密码不一致");
        } else {
            if ($scope.pwd.old == $scope.pwd.new1) {
                alert("新旧密码不能相同");
            }
            else {
                if ($scope.pwd.new1.length < 6) {
                    alert("密码须不少于六位");
                }
                else {
                    $http.post('/stu/changePassword', {
                        pwd: $scope.pwd
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
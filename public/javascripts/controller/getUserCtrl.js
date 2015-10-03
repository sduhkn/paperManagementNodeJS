/**
 * Created by Administrator on 2015/10/3.
 */
var myApp = angular.module('myApp',[]);
myApp.controller('getUser',function($scope,$http){
    $http.get('localhost:3000/user')
        .success(function(data, status, headers, config){
            $scope.userData = data.title2;
        }).error(function(data, status, headers, config){
            alert(status);
        });
});
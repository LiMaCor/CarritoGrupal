'use strict';

moduloDirectivas.directive('plistoperationbarspa', function () {
    return {
        restrict: 'A',
        templateUrl: 'js/system/component/plistspa/plistoperationbarspa.html',
//        scope:{
//            Fields:'@' //one way data binding
//        }
    };
});
moduloSistema.controller('plistoperationbarspaController',
        ['$scope',
            function ($scope) {
//        $scope.ob = $scope.$parent.ob;
//        $scope.obj = $scope.$parent.obj;
//            $scope.chooseOne = function (id) {
//            alert(id);
//
//        }
            }]);
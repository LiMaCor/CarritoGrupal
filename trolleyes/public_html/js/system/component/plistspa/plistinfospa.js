'use strict';

moduloDirectivas.directive('plistinfospa', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/system/component/plistspa/plistinfospa.html',
//        scope:{
//            Fields:'@' //one way data binding
//        }
    };
});
moduloSistema.controller('plistInfospaController',
        ['$scope', '$rootScope', '$location',
            function ($scope, $rootScope, $location) {
                $scope.doresetorder = function () {
                    $rootScope.$broadcast('resetOrderEvent');
                    return false;
                };
                $scope.doresetfilter = function () {
                    $rootScope.$broadcast('resetFilterEvent');
                    return false;
                };
                $scope.resetClientfilter = function () {
                    $scope.$parent.searchText = "";
                    return false;
                };
            }
        ]);
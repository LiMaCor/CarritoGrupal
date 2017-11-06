'use strict';

moduloDirectivas.directive('plistheaderspa', function () {
    return {
        restrict: 'A',
        templateUrl: 'js/system/component/plistspa/plistheaderspa.html'
    };
});

moduloSistema.controller('plistheaderspaController',
        ['$scope', '$rootScope',
            function ($scope, $rootScope) {
                $scope.dosortSelection = function (field, mode)
                {
                    $scope.uorder = field + ',' + mode;
                    $rootScope.$broadcast('orderSelectionEvent', $scope.uorder);
                    return false;
                }
            }]);
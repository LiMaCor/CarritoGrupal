'use strict';

moduloDirectivas.directive('plistrppspa', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/system/component/plistspa/plistrppspa.html'
    };
});
moduloSistema.controller('plistrppspaController',
        ['$scope', 'toolService', '$rootScope',
            function ($scope, toolService, $rootScope) {
                $scope.getUrlFromRpp = function (rpp) {
                    return "" + toolService.getUrlFromParams($scope.$parent.ob, $scope.$parent.op, $scope.$parent.numpage, rpp, $scope.$parent.ufilter, $scope.$parent.uorder);
                }
                $scope.showRPPSelection = function (rpp)
                {
                    $rootScope.$broadcast('rppSelectionEvent', rpp);
                }
            }
        ]);
'use strict';

moduloDirectivas.directive('plistpaginationspa', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/system/component/plistspa/plistpaginationspa.html'
    };
});
moduloSistema.controller('plistPaginationspaController',
        ['$scope', 'toolService', '$rootScope',
            function ($scope, toolService, $rootScope) {
                $scope.getRangeArray = toolService.getRangeArray;
                $scope.evaluateMin = toolService.evaluateMin;
                $scope.evaluateMax = toolService.evaluateMax;
                $scope.gotopage = function (numpage)
                {
                    $rootScope.$broadcast('pageSelectionEvent', numpage);
                    return false;
                }

            }]);
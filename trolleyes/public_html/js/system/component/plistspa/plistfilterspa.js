'use strict';

moduloDirectivas.directive('plistfilterspa', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/system/component/plistspa/plistfilterspa.html',
//        scope:{
//            Fields:'@' //one way data binding
//        }
    };
});
moduloSistema.controller('plistFilterspaController',
        ['$scope', '$rootScope',
            function ($scope, $rootScope) {
                //$scope.Fields = $scope.$parent.Fields;
                $scope.filter = "id";
                $scope.filteroperator = "like";
                $scope.filtervalue = "";
                $scope.doFilterSelection = function ()
                {
                    if ($scope.filter && $scope.filteroperator && $scope.filtervalue) {
                        if ($scope.filterParams) {
                            $scope.filterExpression = $scope.filterParams + '+and,' + $scope.filter + ',' + $scope.filteroperator + ',' + $scope.filtervalue;
                        } else {
                            $scope.filterExpression = 'and,' + $scope.filter + ',' + $scope.filteroperator + ',' + $scope.filtervalue;
                        }
                        $rootScope.$broadcast('filterSelectionEvent', $scope.filterExpression);
                    }
                    return false;


                }







            }]);
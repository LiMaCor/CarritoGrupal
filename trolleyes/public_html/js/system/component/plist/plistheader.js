'use strict';
moduloDirectivas.directive('plistheader', function () {
    return {
        restrict: 'A',
        templateUrl: 'js/system/component/plist/plistheader.html'
    };
});

moduloSistema.controller('plistheaderController',
        ['$scope', '$location',
            function ($scope, $location) {
//        $scope.Fields = $scope.$parent.Fields;
//        $scope.dosort = $scope.$parent.dosort;
                $scope.doorder = function (orderField, ascDesc) {
                    if ($scope.$parent.filterParams) {
                        $location.url($scope.url + '/' + $scope.numpage + '/' + $scope.rpp + '?filter=' + $scope.$parent.filterParams + '&order=' + orderField + ',' + ascDesc);
                    } else {
                        $location.url($scope.url + '/' + $scope.numpage + '/' + $scope.rpp + '?' + 'order=' + orderField + ',' + ascDesc);
                    }
                    //$location.url($scope.url + '/' + $scope.numpage + '/' + $scope.rpp).search('filter', $scope.$parent.filterParams).search('sfilter', $scope.sfilterParams).search('order', orderField + ',' + ascDesc);
                    return false;
                };
            }]);
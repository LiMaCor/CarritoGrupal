'use strict';
moduloDirectivas.component('cplistinfo', {
    restrict: 'E',
    bindings: {
        url: '<',
        numpage: '<',
        rpp: '<',
        registers: '<',
        orderparams: '<',
        filterparams: '<',
        searchtext: '='
    },
    templateUrl: 'js/system/component/plist/cplistinfo.html',
    controllerAs: 'pli',
    controller: ['$location', function ($location) {
            var self = this;
            self.doresetorder = function () {
                if (self.filterparams) {
                    $location.url(self.url + '/' + self.numpage + '/' + self.rpp).search('filter', self.filterparams);
                } else {
                    $location.url(self.url + '/' + self.numpage + '/' + self.rpp);
                }
                return false;
            };
            self.doresetfilter = function () {
                if (self.orderparams) {
                    $location.url(self.url + '/' + self.numpage + '/' + self.rpp).search('order', self.orderparams);
                } else {
                    $location.url(self.url + '/' + self.numpage + '/' + self.rpp);
                }
                return false;
            };
            self.resetClientfilter = function () {
                self.searchText = "";
                return false;
            };
        }]
});

'use strict';
moduloDirectivas.component('cplistrpp', {
    restrict: 'E',
    bindings: {
        url: '<',
        numpage: '<',
        rpp: '<',
        orderparams: '<',
        filterparams: '<',
        sfilterparams: '<'
    },
    templateUrl: 'js/system/component/plist/cplistrpp.html',
    controllerAs: 'crpp',
    controller: ['$location', function ($location) {
            var self = this;
            self.repaginate = function (rpp) {
                if (self.filterparams) {
                    if (self.orderparams) {
                        $location.url(self.url + '/' + self.numpage + '/' + rpp + '?filter=' + self.filterparams + '&order=' + self.orderparams);
                    } else {
                        $location.url(self.url + '/' + self.numpage + '/' + rpp + '?filter=' + self.filterparams);
                    }
                } else {
                    if (self.orderparams) {
                        $location.url(self.url + '/' + self.numpage + '/' + rpp + '&order=' + self.orderparams);
                    } else {
                        $location.url(self.url + '/' + self.numpage + '/' + rpp);
                    }
                }

                //$location.path(self.url + '/' + self.numpage + '/' + rpp).search('filter', self.filterparams).search('sfilter', self.sfilterparams).search('order', self.orderparams);
                return false;
            };
        }]
});

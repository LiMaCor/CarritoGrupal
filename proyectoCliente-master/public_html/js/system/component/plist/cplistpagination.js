'use strict';
moduloDirectivas.component('cplistpagination', {
    restrict: 'E',
    bindings: {
        url: '<',
        numpage: '<',
        rpp: '<',
        pages: '<',
        neighbourhood: '<',
        filterparams: '<',
        orderparams: '<',
        sfilterparams: '<'
    },
    templateUrl: 'js/system/component/plist/cplistpagination.html',
    controllerAs: 'pf',
    controller:
            ['toolService', '$location',
                function (toolService, $location) {
                    var self = this;
                    self.gotopage = function (numpage) {
                        self.numpage = numpage;
                        if (self.filterparams) {
                            if (self.orderparams) {
                                $location.url(self.url + '/' + self.numpage + '/' + self.rpp + '?filter=' + self.filterparams + '&order=' + self.orderparams);
                            } else {
                                $location.url(self.url + '/' + self.numpage + '/' + self.rpp + '?filter=' + self.filterparams);
                            }
                        } else {
                            if (self.orderparams) {
                                $location.url(self.url + '/' + self.numpage + '/' + self.rpp + '&order=' + self.orderparams);
                            } else {
                                $location.url(self.url + '/' + self.numpage + '/' + self.rpp);
                            }
                        }
                        //$location.url(self.url + '/' + self.numpage + '/' + self.rpp + '?' + self.filterparams + self.orderparams);
                        //$location.path(self.url + '/' + self.numpage + '/' + self.rpp).search('filter', self.filterparams).search('order', self.orderparams);
                        return false;
                    };
                    self.getRangeArray = toolService.getRangeArray;
                    self.evaluateMin = toolService.evaluateMin;
                    self.evaluateMax = toolService.evaluateMax;
                }
            ]
});

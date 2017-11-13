'use strict';
moduloDirectivas.component('cplistfilterbynumber', {
    restrict: 'E',
    bindings: {
        url: '<',
        fields: '<',
        rpp: '<',
        numpage: '<',
        orderparams: '<',
        filterparams: '<'
    },
    templateUrl: 'js/system/component/plist/cplistfilterbynumber.html',
    controllerAs: 'filterbynumber',
    controller:
            ['$location',
                function ($location) {
                    var self = this;
                    self.field = "";
                    self.operator = "";
                    self.value = "";
                    self.dofilter = function () {
                        if (self.field != "" && self.operator != "" && self.value != "") {
                            var newFilter = self.filterparams + "+and," + self.field + "," + self.operator + "," + self.value;
                            if (self.orderparams) {
                                $location.path(self.url + '/' + self.numpage + '/' + self.rpp).search('filter', newFilter).search('order', self.orderparams);
                            } else {
                                $location.path(self.url + '/' + self.numpage + '/' + self.rpp).search('filter', newFilter);
                            }
                        }
                        return false;
                    };
                }
            ]
});



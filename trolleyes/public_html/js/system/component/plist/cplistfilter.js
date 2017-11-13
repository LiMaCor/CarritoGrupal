'use strict';
moduloDirectivas.component('cplistfilter', {
    restrict: 'E',
    bindings: {
        url: '<',
        fields: '<',
        rpp: '<',
        numpage: '<',
        order: '<',
        filterp: '<',
        sfilter: '<'
    },
    templateUrl: 'js/system/component/plist/cplistfilter.html',
    controllerAs: 'cf',
    controller:
            ['$location',
                function ($location) {
                    var self = this;
                    self.dofilter = function ()
                    {
                        if (self.filter && self.filteroperator && self.filtervalue) {
                            if (self.filterp) {
                                self.filterExpression = self.filterp + '+and,' + self.filter + ',' + self.filteroperator + ',' + self.filtervalue;
                            } else {
                                self.filterExpression = 'and,' + self.filter + ',' + self.filteroperator + ',' + self.filtervalue;
                            }
                            $location.path(self.url + '/' + self.numpage + '/' + self.rpp).search('filter', self.filterExpression).search('sfilter', self.sfilter).search('order', self.order);
                        }
                        return false;
                    }
                }
            ]
});



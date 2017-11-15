'use strict';
moduloDirectivas.component('plistfilterbynumberspa', {
    restrict: 'E',
    bindings: {
        fields: '<',
        rpp: '<',
        numpage: '<',
        orderparams: '<',
        filterparams: '<'
    },
    templateUrl: 'js/system/component/plistspa/plistfilterbynumberspa.html',
    controllerAs: 'filterbynumber',
    controller:
            ['$rootScope',
                function ($rootScope) {
                    var self = this;
                    self.field = "";
                    self.operator = "";
                    self.value = "";
                    self.dofilter = function () {
                        if (self.field != "" && self.operator != "" && self.value != "") {
                            var newFilter = self.filterparams + "+and," + self.field + "," + self.operator + "," + self.value;
                            $rootScope.$broadcast('filterSelectionEvent', newFilter);
                        }
                        return false;
                    };
                }
            ]
});
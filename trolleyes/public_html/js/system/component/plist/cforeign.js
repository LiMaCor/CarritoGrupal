'use strict';
moduloDirectivas.component('cforeign', {
    restrict: 'E',
    bindings: {
        obf: '<',
        opf: '<',
        idf: '<',
        descf: '<'
    },
    templateUrl: 'js/system/component/plist/cforeign.html',
    controllerAs: 'cf',
    controller:
            ['$location',
                function ($location) {
                    var self = this;
                }
            ]
});



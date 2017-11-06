'use strict';
moduloDirectivas.component('cplistpaginationspa', {
    restrict: 'E',
    bindings: {
        ob: '<',
        op: '<',
        numpage: '<',
        rpp: '<',
        pages: '<',
        neighbourhood: '<',
        pageSelectionEvent: '&'
    },
    templateUrl: 'js/system/component/plistspa/cplistpaginationspa.html',
    controllerAs: 'pf',
    controller:
            ['toolService',
                function (toolService) {
                    var self = this;
                    self.gotopage = function (numpage) {
                        self.pageSelectionEvent({'selectedPageNumber': numpage})
                        return false;
                    };
                    self.getRangeArray = toolService.getRangeArray;
                    self.evaluateMin = toolService.evaluateMin;
                    self.evaluateMax = toolService.evaluateMax;
                }
            ]
});

'use strict';
moduloDirectivas.component('cplistfilterbyforeign', {
    restrict: 'E',
    bindings: {
        url: '<',
        field: '<',
        rpp: '<',
        numpage: '<',
        orderparams: '<',
        filterparams: '<',
        profile: '<'
    },
    templateUrl: 'js/system/component/plist/cplistfilterbyforeign.html',
    controllerAs: 'filterbyforeign',
    controller:
            ['$location',
                function ($location) {
                    var self = this;
                    self.operator = "";

                    self.obj_foreign = {"id": 1};


                    //[{'name':'id_tipousuario','longname':'Tipo de usuario','reference':'tipousuario','description':'['descripcion']'}]



                    self.dofilter = function () {
                        if (self.operator != "" && self.value != "") {
                            var newFilter = self.filterparams + "+and," + self.field.name + "," + self.operator + "," + self.obj_foreign.id;
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



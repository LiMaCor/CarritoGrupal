'use strict';
moduloDirectivas.component('miniview', {
    restrict: 'E',
    bindings: {
        id: '<',
        nombre: '<'
    },
    templateUrl: "js/system/component/miniview/miniview.html",
    controllerAs: 'ct',
    controller:
            ['serverCallService',
                function (serverCallService) {
                    var self = this;
                    this.$onInit = function () {
                        serverCallService.getOne(self.nombre, self.id).then(function (response) {
                            if (response.status == 200) {
                                if (response.data.status == 200) {
                                    self.status = null;
                                    self.bean = response.data.message.data;


                                    self.metaobj = response.data.message.metaobj;
                                    self.metaprops = response.data.message.metaprops;

                                } else {
                                    self.status = "Error en la recepción de datos del servidor";
                                }
                            } else {
                                self.status = "Error en la recepción de datos del servidor";
                            }
                        }).catch(function (data) {
                            self.status = "Error en la recepción de datos del servidor";
                        });
                    }
                }
            ]
});


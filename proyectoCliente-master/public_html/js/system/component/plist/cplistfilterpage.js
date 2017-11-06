'use strict';
moduloDirectivas.component('cplistfilterpage', {
    restrict: 'E',
    bindings: {
        url: '<',
        fields: '<',
        rpp: '<',
        numpage: '<',
        order: '<',
        filter: '<'
    },
    templateUrl: 'js/system/component/plist/cplistfilterpage.html',
    controllerAs: 'cf',
    controller:
            ['$location',
                function ($location) {
                    var self = this;
                    self.bean = {};
                    self.dofilter = function ()
                    {
                        self.filter_array = [];
                        for (var key in  self.bean) {
                            if (key.startsWith('opt')) {
                                var campo = key.split('_').pop(-1);
                                for (var key2 in  self.bean) {
                                    if (self.bean[key2]) {
                                        if (key2.startsWith('text') || key2.startsWith('double') || key2.startsWith('longtext') || key2.startsWith('int')) {
                                            var campo2 = key2.split('_').pop(-1);
                                            if (campo === campo2) {
                                                self.filter_array.push(self.dameFiltro(campo, self.bean[key], self.bean[key2]));
                                            }
                                        }
                                    }
                                }
                            }
                            if (key.startsWith('id_')) {
                                var id_value = self.bean[key]['id'];
                                self.filter_array.push(self.dameFiltro(key, 'equa', id_value));
                            }
                            if (key.startsWith('fini_')) {
                                var fini_field = key.substring(key.indexOf('_') + 1, key.length);
                                //var fini_value = self.bean[key].replace(/ /g, "+").replace(/\//g, "-");
                                var fini_value = self.bean[key];
                                self.filter_array.push(self.dameFiltro(fini_field, 'dgeq', fini_value));
                            }
                            if (key.startsWith('fend_')) {
                                var fend_field = key.substring(key.indexOf('_') + 1, key.length);
                                //var fend_value = self.bean[key].replace(/ /g, "+").replace(/\//g, "-");
                                var fend_value = self.bean[key];
                                self.filter_array.push(self.dameFiltro(fend_field, 'dleq', fend_value));
                            }
                            if (key.startsWith('bool_')) {
                                var campo = key.split('_').pop(-1);
                                self.filter_array.push(self.dameFiltro(campo, 'equa', self.bean[key]));
                            }

                        }

//                if (self.filter && self.filteroperator && self.filtervalue) {
//                    if (self.filterParams) {
//                        self.filterExpression = self.filterParams + '+and,' + self.filter + ',' + self.filteroperator + ',' + self.filtervalue;
//                    } else {
//                        self.filterExpression = 'and,' + self.filter + ',' + self.filteroperator + ',' + self.filtervalue;
//                    }
//                    $location.path(self.url + '/' + self.numpage + '/' + self.rpp).search('filter', self.filterExpression).search('sfilter', self.sfilter).search('order', self.order);
//                }
                        var arrayLength = self.filter_array.length;
                        var strFilter = "";
                        for (var i = 0; i < arrayLength; i++) {
                            strFilter += self.filter_array[i] + "&";
                        }
                        if (strFilter) {
                            strFilter = strFilter.substring(0, strFilter.length - 1);
                        }
                        //self.strFilter = self.url + '/' + self.numpage + '/' + self.rpp + '?filter=' + strFilter;
                        //$location.url(self.strFilter).search('order', self.order);
                        if (strFilter) {
                            if (self.order) {
                                $location.url(self.url + '/' + self.numpage + '/' + self.rpp + '?' + strFilter + '&order=' + self.order);
                            } else {
                                $location.url(self.url + '/' + self.numpage + '/' + self.rpp + '?' + strFilter);
                            }
                        } else {
                            if (self.orderparams) {
                                $location.url(self.url + '/' + self.numpage + '/' + self.rpp + '&order=' + self.order);
                            } else {
                                $location.url(self.url + '/' + self.numpage + '/' + self.rpp);
                            }
                        }
                        return false;
                    }
                    self.dameFiltro = function (campo, operador, valor) {
                        return 'filter=and,' + campo + ',' + operador + ',' + valor;
                    }
                }
            ]
});



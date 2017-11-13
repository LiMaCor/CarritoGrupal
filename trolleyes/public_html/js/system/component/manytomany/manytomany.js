moduloDirectivas.component('manytomany', {
    templateUrl: "js/system/component/manytomany/manytomany.html",
    controllerAs: 'mtm',
    controller: manyToMany,
    bindings: {
        iconbootstrap: '@',
        id: '<',
        referencetable: '<',
        table: '<'
    }

});

function manyToMany($uibModal) {
    var self = this;


    self.open = function (id) {
        var modalInstance = $uibModal.open({
            templateUrl: 'js/system/component/manytomany/modal.html',
            controller: 'mtmModal',
            windowClass: 'mtmModal1',
            resolve: {
                id: function () {
                    return id;
                },
                reference: function () {
                    return self.referencetable;
                },
                currentTable: function () {
                    return self.table;
                }
            }
        });

    };

//    function getData(id) {
//        var filter = '&filter=and,id_' + self.table + ',equa,' + id;
//        serverService.getAll(self.referencetable.name,filter).then(function (data) {
//            var vars = self.referencetable.vars;
//            var mdata = data.data.message;
//            var result = [];
//
//            for (var d in mdata) {
//                var res = [];
//                for (var v in vars) {
//                    if (typeof vars[v] === 'object') {
//                        var n = Object.keys(vars[v]);
//                        res.push(mdata[d][n[0]][vars[v][n[0]]]);
//                    } else {
//                        res.push(mdata[d][vars[v]]);
//                    }
//                }
//                result.push(res);
//            }
//
//            self.data = result;
//        }).catch(function (err) {
//            console.log('error', err);
//        });
//    }
}



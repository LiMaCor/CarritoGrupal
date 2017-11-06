moduloDirectivas.controller('mtmModal',
        ['$scope', 'serverCallService', '$uibModalInstance', '$uibModal', 'id', 'reference', 'currentTable',
            function ($scope, serverCallService, $modalInstance, $uibModal, id, reference, currentTable) {
                $scope.fields = reference.fields;
                $scope.vars = reference.vars;

                function getData() {
                    var filter = '&filter=and,id_' + currentTable + ',equa,' + id;
                    serverCallService.getAll(reference.name, filter).then(function (data) {
                        var vars = reference.vars;
                        var mdata = data.data.message;
                        var result = [];

                        for (var d in mdata) {
                            var res = [];
                            for (var v in vars) {
                                if (typeof vars[v] === 'object') {
                                    var n = Object.keys(vars[v]);
                                    res.push(mdata[d][n[0]][vars[v][n[0]]]);
                                } else {
                                    res.push(mdata[d][vars[v]]);
                                }
                            }
                            result.push(res);
                        }

                        $scope.data = result;
                    }).catch(function (err) {
                        console.log('error', err);
                    });
                }

                getData();

                $scope.add = function () {
                    var modalInstance2 = $uibModal.open({
                        templateUrl: 'js/system/component/manytomany/modal2.html',
                        controller: 'mtmModal2',
                        size: 'lg',
                        resolve: {
                            id: function () {
                                return id;
                            },
                            reference: function () {
                                return reference.name;
                            },
                            from: function () {
                                return currentTable;
                            }
                        }
                    }).result.then(function (modalResult) {
                        if (modalResult) {
                            getData();
                        }

                    }).catch(function (err) {
                        console.log(err);
                    });
                    ;
                };

                $scope.cancel = function () {
                    $modalInstance.close();
                };
            }
        ]);


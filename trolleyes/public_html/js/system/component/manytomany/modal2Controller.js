moduloDirectivas.controller('mtmModal2',
        ['$scope', 'metaService', 'id', 'reference', 'from', '$filter', 'serverCallService', 'toolService', '$uibModalInstance',
            function ($scope, metaService, id, reference, from, $filter, serverCallService, toolService, $uibModalInstance) {

                var fields = metaService.getMeta()[reference].fields;
                $scope.bean = {id: 0};
                var pos = null;

                for (var f in fields) {
                    if (fields[f].name.match('obj_')) {
                        $scope.bean[fields[f].name] = {id: 0}

                    }
                    if (fields[f].name.match('obj_' + from)) {
                        $scope.bean[fields[f].name].id = id;
                        pos = f;
                    }
                }
                delete fields[pos];

                $scope.fields = fields;

                $scope.save = function () {

                    for (var f in fields) {
                        if (fields[f].type === 'date') {
                            $scope.bean[fields[f].name] = $filter('date')($scope.bean[fields[f].name], "dd/MM/yyyy");
                        }
                    }

                    var jsonToSend = {json: JSON.stringify(toolService.array_identificarArray($scope.bean))};

                    serverCallService.set(reference, jsonToSend).then(function (response) {
                        if (response.status === 200) {
                            $uibModalInstance.close(true);
                        } else {
                            $uibModalInstance.close(false);
                        }
                    }).catch(function (data) {
                        console.log(data);
                    });

                };

                $scope.close = function () {
                    $uibModalInstance.close();
                };


            }]);



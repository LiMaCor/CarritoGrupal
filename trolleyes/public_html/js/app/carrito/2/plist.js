'use strict';
moduloCarrito.controller('CarritoPList2Controller',
        ['$scope', '$routeParams', '$location', 'serverCallService', 'toolService', 'constantService', 'objectService',
            function ($scope, $routeParams, $location, serverCallService, toolService, constantService, objectService) {
                $scope.ob = "carrito";
                $scope.op = "plist";
                $scope.profile = 2;
                //---
                $scope.status = null;
                $scope.debugging = constantService.debugging();
                $scope.url = $scope.ob + '/' + $scope.profile + '/' + $scope.op;
                //----
                $scope.numpage = toolService.checkDefault(1, $routeParams.page);
                $scope.rpp = toolService.checkDefault(10, $routeParams.rpp);
                $scope.neighbourhood = constantService.getGlobalNeighbourhood();
                //---
                $scope.orderParams = toolService.checkEmptyString($routeParams.order);
                $scope.filterParams = toolService.checkEmptyString($routeParams.filter);
                //---
                $scope.objectService = objectService;
                //---
                
                $scope.filterNumber = [{'name': 'id', 'longname': 'Identificador'},{'name': 'cantidad', 'longname': 'Cantidad'}];
               
               
                //---
                $scope.visibles = {};
                $scope.visibles.id = true;
                $scope.visibles.cantidad = true;
                $scope.visibles.producto = true;
                $scope.visibles.oProducto = true;
                
             
                //---
                
                    serverCallService.list($scope.ob).then(function (response) {
                       if (response.status == 200) {
                       
                            
                            $scope.carritobean = response.data.json;
                        
                    } else {
                        $scope.status = "Error en la recepción de datos del servidor";
                    }
                }).catch(function (data) {
                    $scope.status = "Error en la recepción de datos del servidor";
                });
                
                $scope.doorder = function (orderField, ascDesc) {
                    $location.url($scope.url + '/' + $scope.numpage + '/' + $scope.rpp).search('filter', $scope.filterParams).search('order', orderField + ',' + ascDesc);
                    return false;
                };
                $scope.close = function () {
                    $location.path('/home');
                };
                
            }
        ]);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';
moduloCarrito.controller('CarritoBuy2Controller',
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

                //---
                $scope.buy = function () {
                    serverCallService.buy($scope.ob).then(function (response) {
                        if (response.status == 200) {
                            if (response.data.status == 200) {
                                if (response.data.json) {
                                    $scope.status = "Gracias por su compra.";
                                } else {
                                    $scope.status = "Error en la compra de datos del servidor";
                                }
                            } else {
                                $scope.status = "Error en la recepción de datos del servidor 1";
                            }
                        } else {
                            $scope.status = "Error en la recepción de datos del servidor 2";
                        }
                    }).catch(function (data) {
                        $scope.status = "Error en la recepción de datos del servidor 3";
                    });
                };
                $scope.back = function () {
                    window.history.back();
                };

                $scope.close = function () {
                    $location.path('/home');
                };

            }
        ]);
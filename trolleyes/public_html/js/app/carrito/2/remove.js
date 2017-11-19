'use strict';

moduloCarrito.controller('CarritoRemove2Controller',
        ['$scope', '$routeParams', 'serverCallService', '$location', 'sessionService', 'constantService','objectService',
            function ($scope, $routeParams, serverCallService, $location, sessionService, constantService,objectService) {
                $scope.ob = "carrito";
                $scope.op = "remove";
                $scope.profile = 2;
                //---
                $scope.status = null;
                $scope.debugging = constantService.debugging();
                $scope.url = $scope.ob + '/' + $scope.profile + '/' + $scope.op;
                //---
                $scope.id_producto = $routeParams.id_producto;
                //---
                $scope.objectService = objectService;
                //---
                serverCallService.getOne($scope.ob, $scope.id_producto).then(function (response) {
                    if (response.status == 200) {
                        if (response.data.status == 200) {
                            $scope.status = null;
                            $scope.carritobean = response.data.json;
                        } else {
                            $scope.status = "Error en la recepción de datos del servidor";
                        }
                    } else {
                        $scope.status = "Error en la recepción de datos del servidor";
                    }
                }).catch(function (data) {
                    $scope.status = "Error en la recepción de datos del servidor";
                });
                $scope.remove = function () {
                    serverCallService.remove($scope.ob, $scope.id_producto).then(function (response) {
                        if (response.status == 200) {
                            if (response.data.status == 200) {
                                if (response.data.json == 1) {
                                    $scope.status = "El registro con id=" + $scope.id_producto + " se ha eliminado.";
                                } else {
                                    $scope.status = "Error en el borrado de datos del servidor";
                                }
                            } else {
                                $scope.status = "Error en la recepción de datos del servidor";
                            }
                        } else {
                            $scope.status = "Error en la recepción de datos del servidor";
                        }
                    }).catch(function (data) {
                        $scope.status = "Error en la recepción de datos del servidor";
                    });
                }
                $scope.back = function () {
                    window.history.back();
                };
                $scope.close = function () {
                    $location.path('/home');
                };
            }]);
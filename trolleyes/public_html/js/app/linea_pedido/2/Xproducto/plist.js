/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


'use strict';
moduloLinea_pedido.controller('Linea_pedidoXproductoPList2Controller',
        ['$scope', '$routeParams', '$location', 'serverCallService', 'toolService', 'constantService', 'objectService',
            function ($scope, $routeParams, $location, serverCallService, toolService, constantService, objectService) {
                $scope.ob = "linea_pedido";
                $scope.op = "plistXproducto";
                $scope.profile = 2;
                //---
                $scope.status = null;
                $scope.debugging = constantService.debugging();
                $scope.url = $scope.ob + '/' + $scope.profile + '/' + $scope.op + '/' + $routeParams.id_usuario;
                //----
                $scope.xob = "producto";
                $scope.xid = $routeParams.id_producto;
                //----
                $scope.numpage = toolService.checkDefault(1, $routeParams.page);
                $scope.rpp = toolService.checkDefault(10, $routeParams.rpp);
                $scope.neighbourhood = constantService.getGlobalNeighbourhood();
                //---
                $scope.orderParams = toolService.checkEmptyString($routeParams.order);
                $scope.filterParams = toolService.checkEmptyString($routeParams.filter);
                //---
                $scope.visibles = {};
                $scope.visibles.id = true;
                $scope.visibles.cantidad = true;
                $scope.visibles.id_pedido = true;
                $scope.visibles.id_producto = true;
                
                //--
                $scope.filterString = null;
                $scope.filterNumber = [{'name': 'id', 'longname': 'Identificador'},{'name': 'cantidad', 'longname': 'Cantidad'}];
                $scope.filterPedido = {'name': 'id_pedido', 'longname': 'Pedido', 'reference': 'pedido', 'description': ['id', 'iva']};
                $scope.filterProducto = {'name': 'id_producto', 'longname': 'Producto', 'reference': 'producto', 'description': ['id', 'descripcion']};
                //---
                $scope.objectService = objectService;
                //---
                function getDataFromServer() {
                    serverCallService.getOne($scope.xob, $scope.xid).then(function (response) {
                        if (response.status == 200) {
                            if (response.data.status == 200) {
                                $scope.status = null;
                                $scope.productobean = response.data.json;
                            } else {
                                $scope.status = "Error en la recepción de datos del servidor";
                            }
                        } else {
                            $scope.status = "Error en la recepción de datos del servidor";
                        }
                    }).catch(function (data) {
                        $scope.status = "Error en la recepción de datos del servidor";
                    });
                    serverCallService.getCountX($scope.ob, $scope.xob, $scope.xid, $scope.filterParams).then(function (response) {
                        if (response.status == 200) {
                            $scope.registers = response.data.json;
                            $scope.pages = toolService.calculatePages($scope.rpp, $scope.registers);
                            if ($scope.numpage > $scope.pages) {
                                $scope.numpage = $scope.pages;
                            }
                            return serverCallService.getPageX($scope.ob, $scope.xob, $scope.xid, $scope.rpp, $scope.numpage, $scope.filterParams, $routeParams.order);
                        } else {
                            $scope.status = "Error en la recepción de datos del servidor";
                        }
                    }).then(function (response) {
                        if (response.status == 200) {
                            $scope.page = response.data.json;
                        } else {
                            $scope.status = "Error en la recepción de datos del servidor";
                        }
                    }).catch(function (data) {
                        $scope.status = "Error en la recepción de datos del servidor";
                    });
                }

                $scope.doorder = function (orderField, ascDesc) {
                    $location.url($scope.url + '/' + $scope.numpage + '/' + $scope.rpp).search('filter', $scope.filterParams).search('order', orderField + ',' + ascDesc);
                    return false;
                };
                $scope.close = function () {
                    $location.path('/home');
                };
                getDataFromServer();
            }
        ]);
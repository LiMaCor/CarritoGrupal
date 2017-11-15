/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


'use strict';

moduloUsuario.controller('UsuarioSelection1Controller',
        ['$scope', '$uibModalInstance', 'serverCallService', '$location', 'toolService', 'objectService',
            function ($scope, $modalInstance, serverCallService, $location, toolService, objectService) {
                $scope.ob = 'usuario';
                $scope.op = "selection";
                //---
                $scope.numpage = 1;
                $scope.rpp = 10;
                $scope.neighbourhood = 1;
                //---
                $scope.status = null;
                $scope.debugging = true;
                //---
                $scope.orderParams = null;
                $scope.filterParams = null;

                $scope.visibles = {};
                $scope.visibles.id = true;
                $scope.visibles.nombre = true;
                
                $scope.filterString = [{'name': 'nombre', 'longname': 'Nombre'}];
                $scope.filterNumber = [{'name': 'id', 'longname': 'Identificador'}];
                
                $scope.objectService = objectService;

                $scope.closeForm = function (id) {
                    $modalInstance.close(id);
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                }
                function getData() {
                    serverCallService.getCount($scope.ob, $scope.filterParams).then(function (response) {
                        if (response.status == 200) {
                            $scope.registers = response.data.json;
                            $scope.pages = toolService.calculatePages($scope.rpp, $scope.registers);
                            if ($scope.numpage > $scope.pages) {
                                $scope.numpage = $scope.pages;
                            }
                            return serverCallService.getPage($scope.ob, $scope.rpp, $scope.numpage, $scope.filterParams, $scope.orderParams);
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
                $scope.$on('filterSelectionEvent', function (event, data) {
                    $scope.filterParams = data;
                    getData();
                });
                $scope.$on('orderSelectionEvent', function (event, data) {
                    $scope.orderParams = data;
                    getData();
                });
                $scope.$on('pageSelectionEvent', function (event, data) {
                    $scope.numpage = data;
                    getData();
                });
                $scope.$on('rppSelectionEvent', function (event, data) {
                    $scope.rpp = data;
                    getData();
                });
                $scope.$on('resetOrderEvent', function (event) {
                    $scope.orderParams = null;
                    getData();
                });
                $scope.$on('resetFilterEvent', function (event) {
                    $scope.filterParams = null;
                    getData();
                });
                $scope.chooseOne = function (id) {
                    $scope.closeForm(id);
                    return false;
                }


               
                
                
                
                $scope.doorder = function (orderField, ascDesc) {
                    $scope.orderParams = orderField + ',' + ascDesc;
                    getData();
                    return false;
                };

                getData();
            }
        ]);
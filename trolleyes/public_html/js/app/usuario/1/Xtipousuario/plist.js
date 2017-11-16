/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';
moduloUsuario.controller('UsuarioXtipousuarioPList1Controller',
        ['$scope', '$routeParams', '$location', 'serverCallService', 'toolService', 'constantService', 'objectService',
            function ($scope, $routeParams, $location, serverCallService, toolService, constantService, objectService) {
                $scope.ob = "usuario";
                $scope.op = "plistXtipousuario";
                $scope.profile = 1;
                //---
                $scope.status = null;
                $scope.debugging = constantService.debugging();
                $scope.url = $scope.ob + '/' + $scope.profile + '/' + $scope.op + '/' + $routeParams.id_usuario;
                //----
                $scope.xob = "tipousuario";
                $scope.xid = $routeParams.id_tipousuario;
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
                $scope.visibles.dni = true;
                $scope.visibles.nombre = true;
                $scope.visibles.primer_apellido = true;
                $scope.visibles.segundo_apellido = true;
                $scope.visibles.login = true;
                $scope.visibles.email = true;
                $scope.visibles.fecha_nacimiento = false;
                $scope.visibles.id_tipousuario = true;
                //--
                
                $scope.filterString = [{'name': 'dni', 'longname': 'DNI'}, {'name': 'nombre', 'longname': 'Nombre'}, {'name': 'primer_apellido', 'longname': 'Primer apellido'}, {'name': 'segundo_apellido', 'longname': 'Segundo apellido'}, {'name': 'login', 'longname': 'Login'}];
                $scope.filterNumber = [{'name': 'id', 'longname': 'Identificador'}];
                $scope.filterDate = [{'name': 'fecha_nacimiento', 'longname': 'Fecha de nacimiento'}];
                $scope.filterBoolean = null;
                $scope.filterTipousuario = {'name':'id_tipousuario','longname':'Tipo de usuario','reference':'tipousuario','description':['descripcion']};
                //---
                $scope.objectService = objectService;
                //---
                function getDataFromServer() {
                    serverCallService.getOne($scope.xob, $scope.xid).then(function (response) {
                        if (response.status == 200) {
                            if (response.data.status == 200) {
                                $scope.status = null;
                                $scope.tipousuariobean = response.data.json;
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
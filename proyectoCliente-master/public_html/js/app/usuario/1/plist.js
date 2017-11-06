/*
 * Copyright (c) 2017 by Rafael Angel Aznar Aparici (rafaaznar at gmail dot com)
 *
 * TROLLEYES helps you to learn how to develop easily AJAX web applications
 *
 * Sources at https://github.com/rafaelaznar/trolleyes
 *
 * TROLLEYES is distributed under the MIT License (MIT)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
'use strict';
moduloUsuario.controller('UsuarioPList1Controller',
        ['$scope', '$routeParams', '$location', 'serverCallService', 'toolService', 'constantService', 'sessionService', 'objectService',
            function ($scope, $routeParams, $location, serverCallService, toolService, constantService, sessionService, objectService) {
                $scope.ob = "usuario";
                $scope.op = "plist";
                //---

                $scope.profile = sessionService.getSessionInfo().obj_tipousuario.id;
                //---
                $scope.status = null;
                //----
                $scope.numpage = toolService.checkDefault(1, $routeParams.page);
                $scope.rpp = toolService.checkDefault(10, $routeParams.rpp);
                $scope.neighbourhood = constantService.getGlobalNeighbourhood();
                //---
                $scope.debugging = constantService.debugging();
                $scope.url = $scope.ob + '/' + $scope.profile + '/' + $scope.op;
                //---
                $scope.orderParams = toolService.checkNull($routeParams.order);
                $scope.filterParams = toolService.getFilter($routeParams.filter);
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
                //---
                function getDataFromServer() {
                    serverCallService.getCount($scope.ob, $scope.filterParams).then(function (response) {
                        if (response.status == 200) {
                            $scope.registers = response.data.json;
                            $scope.pages = toolService.calculatePages($scope.rpp, $scope.registers);
                            if ($scope.numpage > $scope.pages) {
                                $scope.numpage = $scope.pages;
                            }
                            return serverCallService.getPage($scope.ob, $scope.rpp, $scope.numpage, $scope.filterParams, $routeParams.order);
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
                $scope.dofilter = function () {
                    if ($scope.filter != "" && $scope.filteroperator != "" && $scope.filtervalue != "") {
                        if ($routeParams.order && $routeParams.ordervalue) {
                            if ($routeParams.systemfilter && $routeParams.systemfilteroperator) {
                                $location.path($scope.ob + '/' + $scope.op + '/' + $scope.numpage + '/' + $scope.rpp).search('filter', $scope.filter).search('filteroperator', $scope.filteroperator).search('filtervalue', $scope.filtervalue).search('order', $routeParams.order).search('ordervalue', $routeParams.ordervalue).search('systemfilter', $routeParams.systemfilter).search('systemfilteroperator', $routeParams.systemfilteroperator).search('systemfiltervalue', $routeParams.systemfiltervalue);
                            } else {
                                $location.path($scope.ob + '/' + $scope.op + '/' + $scope.numpage + '/' + $scope.rpp).search('filter', $scope.filter).search('filteroperator', $scope.filteroperator).search('filtervalue', $scope.filtervalue).search('order', $routeParams.order).search('ordervalue', $routeParams.ordervalue);
                            }
                        } else {
                            $location.path($scope.ob + '/' + $scope.op + '/' + $scope.numpage + '/' + $scope.rpp).search('filter', $scope.filter).search('filteroperator', $scope.filteroperator).search('filtervalue', $scope.filtervalue);
                        }
                    }
                    return false;
                };
                $scope.doorder = function (orderField, ascDesc) {
                    $location.url($scope.url + '/' + $scope.numpage + '/' + $scope.rpp).search('filter', $scope.filterParams).search('order', orderField + ',' + ascDesc);
                    return false;
                };
                $scope.close = function () {
                    $location.path('/home');
                };
                getDataFromServer();
            }]);



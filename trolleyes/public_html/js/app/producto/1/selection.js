/* 
 * Copyright (c) 2015 by Rafael Angel Aznar Aparici (rafaaznar at gmail dot com)
 * 
 * sisane: The stunning micro-library that helps you to develop easily 
 *             AJAX web applications by using Angular.js 1.x & sisane-server
 * sisane is distributed under the MIT License (MIT)
 * Sources at https://github.com/rafaelaznar/
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
 * 
 */

'use strict';

moduloProducto.controller('ProductoSelection1Controller',
        ['$scope', '$uibModalInstance', 'serverCallService', '$location', 'toolService', 'objectService',
            function ($scope, $modalInstance, serverCallService, $location, toolService, objectService) {
                $scope.ob = 'producto';
                $scope.op = "selection";
                //---
                $scope.numpage = 1;
                $scope.rpp = 10;
                $scope.neighbourhood = 1;
                //---
                $scope.status = null;
                $scope.debugging = true;
                //---
                $scope.objectService = objectService;
                //---
                $scope.orderParams = null;
                $scope.filterParams = null;

                $scope.visibles = {};
                $scope.visibles.id = true;
                $scope.visibles.codigo = true;
                $scope.visibles.descripcion = true;
                $scope.visibles.existencias = true;
                $scope.visibles.precio = true;

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


                $scope.dofilter = function (filterType) {
                    if (filterType == 0) {
                        if ($scope.filter.text.field != "" && $scope.filter.text.operator != "" && $scope.filter.text.value != "") {
                            $scope.filterParams = $scope.filterParams + "+and," + $scope.filter.text.field + "," + $scope.filter.text.operator + "," + $scope.filter.text.value;
                        }
                    }
                    if (filterType == 1) {
                        if ($scope.filter.number.field != "" && $scope.filter.number.operator != "" && $scope.filter.number.value != "") {
                            $scope.filterParams = $scope.filterParams + "+and," + $scope.filter.number.field + "," + $scope.filter.number.operator + "," + $scope.filter.number.value;
                        }
                    }
                    getData();
                    return false;
                };



                $scope.doorder = function (orderField, ascDesc) {
                    $scope.orderParams = orderField + ',' + ascDesc;
                    getData();
                    return false;
                };

                getData();
            }
        ]);
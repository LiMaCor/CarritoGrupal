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
moduloSistema.controller('PasschangeController',
        ['$scope', '$routeParams', '$location', 'constantService', 'sessionService', 'sessionServerCallService',
            function ($scope, $routeParams, $location, constantService, sessionService, sessionServerCallService) {
                $scope.title = "Formulario de cambio de password";
                $scope.icon = "fa-key";

                $scope.session_info = sessionService.getSessionInfo();
                $scope.isSessionActive = sessionService.isSessionActive();
                $scope.debugging = constantService.debugging();
                $scope.status = null;
                $scope.old = '';
                $scope.new = '';
                $scope.passchange = function () {
                    sessionServerCallService.setPass($scope.old, $scope.new).then(function (response) {
                        $scope.response = response;
                        if (response.status == 200) {
                            if (response.data.status == 200) {
                                $scope.status = "El password se ha cambiado";
                                $scope.result = response.data.message;
                            } else {
                                $scope.status = "No se ha cambiado el password";
                            }
                        } else {
                            $scope.status = "No se ha cambiado el password";
                        }
                    }).catch(function (data) {
                        $scope.status = "No se ha cambiado el password";
                    });
                }
            }
        ]);



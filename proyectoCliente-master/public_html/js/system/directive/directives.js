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

moduloDirectivas

        .directive('link', function () {
            return {
                restrict: 'E',
                template: '{{obj.id}} - {{obj.login}} ({{obj.ciudad}})',
                scope: {
                    obj: "=source"
                }
            }
        })

        .directive('linkusuario', function () {
            return {
                restrict: 'E',
                template: '<a ng-if="obj.id" href="usuario/view/{{obj.id}}">{{obj.id}} - {{obj.login}} ({{obj.ciudad}})</a>',
                scope: {
                    obj: "=source"
                }
            }
        })

        .directive('linktipodocumento', function () {
            return {
                restrict: 'E',
                template: '<a ng-if="obj.id" href="tipodocumento/view/{{obj.id}}">{{obj.id}}-({{obj.descripcion}})</a>',
                scope: {
                    obj: "=source"
                }
            }
        })

        .directive('validatemin', function () {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function (scope, elem, attr, ctrl) {
                    scope.$watch(attr.validatemin, function () {
                        ctrl.$setViewValue(ctrl.$viewValue);
                    });
                    var minValidator = function (value) {
                        var min = scope.$eval(attr.validatemin) || 0;
                        if (value && value < min) {
                            ctrl.$setValidity('validatemin', false);
                            return undefined;
                        } else {
                            ctrl.$setValidity('validatemin', true);
                            return value;
                        }
                    };

                    ctrl.$parsers.push(minValidator);
                    ctrl.$formatters.push(minValidator);
                }
            };
        })

        .directive('focus', function () {
            return function (scope, element) {
                element[0].focus();
            }
        })

        .directive('validatemax', function () {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function (scope, elem, attr, ctrl) {
                    scope.$watch(attr.validatemax, function () {
                        ctrl.$setViewValue(ctrl.$viewValue);
                    });
                    var maxValidator = function (value) {
                        var max = scope.$eval(attr.validatemax) || Infinity;
                        if (value && value > max) {
                            ctrl.$setValidity('validatemax', false);
                            return undefined;
                        } else {
                            ctrl.$setValidity('validatemax', true);
                            return value;
                        }
                    };

                    ctrl.$parsers.push(maxValidator);
                    ctrl.$formatters.push(maxValidator);
                }
            };
        })

        .directive('jqdatepicker', function () {
            return {
                restrict: "A",
                require: "ngModel",
                link: function (scope, elem, attrs, ngModelCtrl) {
                    var updateModel = function (dateText) {
                        // call $apply to bring stuff to angular model
                        scope.$apply(function () {
                            ngModelCtrl.$setViewValue(dateText);
                        });
                    };

                    var options = {
                        dateFormat: "dd/mm/yy",
                        // handle jquery date change
                        onSelect: function (dateText) {
                            updateModel(dateText);
                        }
                    };

                    // jqueryfy the element
                    elem.datepicker(options);
                }
            }
        })

        .directive("datetimepicker", function () {
            return {
                restrict: "A",
                require: "ngModel",
                link: function (scope, elem, attrs, ngModelCtrl) {
                    var updateModel = function (dateText) {
                        // call $apply to bring stuff to angular model
                        scope.$apply(function () {
                            ngModelCtrl.$setViewValue(dateText);
                        });
                    };
                    var options = {
                        dateFormat: "dd/mm/yy",
                        // handle jquery date change
                        onSelect: function (dateText) {
                            updateModel(dateText);
                        }
                    };
                    // jqueryfy the element
                    elem.datetimepicker($.timepicker.regional['es']);
                }
            }
        });





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
moduloServicios.factory('toolService', ['$filter', function ($filter) {
        return {
            checkDefault: function (defaultValue, checkedVariable) {
                if (!checkedVariable || checkedVariable < 1) {
                    return defaultValue;
                } else {
                    return checkedVariable;
                }
            },
            checkNull: function (checkedVariable) {
                if (checkedVariable) {
                    return checkedVariable;
                } else {
                    return null;
                }
            },
            checkEmptyString: function (checkedVariable) {
                if (checkedVariable) {
                    return checkedVariable;
                } else {
                    return "";
                }
            },
            //--------
            date_toDate: function (input) {
                var parts = input.split('/');
                return new Date(parts[2], parts[1] - 1, parts[0]);
            },
            date_toDate2: function (input) {
                var parts = input.split('-');
                return new Date(parts[0], parts[1] - 1, parts[2]);
            },
            datetime_toString: function (input) {
                var arrinputdate = input.split(" ");
                var fecha_partes = arrinputdate[0].split("/");
                var hora_partes = arrinputdate[1].split(":");
                var newDate = new Date(fecha_partes[2], fecha_partes[1] - 1, fecha_partes[0], hora_partes[0], hora_partes[1]);
                return $filter('date')(newDate, "dd/MM/yyyy HH:mm");
            },
            array_identificarArray: function (arr) {
                var newObj = {};
                for (var property in arr) {
                    if (arr.hasOwnProperty(property)) {
                        if (property.match("^obj_")) {
                            newObj[property.replace("obj_", "id_")] = arr[property].data.id;
                        } else {
                            newObj[property] = arr[property];
                        }
                    }
                }
                return newObj;
            },
            //----------------------------
            calculatePages: function (regsPerPage, totalRegisters) {
                var pages = Math.floor(totalRegisters / regsPerPage);
                var remainderPages = totalRegisters % regsPerPage;
                if (remainderPages > 0) {
                    pages++;
                }
                return pages;
            },
            //-----
            getRangeArray: function (lowEnd, highEnd) {
                var rangeArray = [];
                for (var i = lowEnd; i <= highEnd; i++) {
                    rangeArray.push(i);
                }
                return rangeArray;
            },
            evaluateMin: function (lowEnd, highEnd) {
                return Math.min(lowEnd, highEnd);
            },
            evaluateMax: function (lowEnd, highEnd) {
                return Math.max(lowEnd, highEnd);
            },
            capitalizeWord: function (string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            },
            getFilterExpression: function (filter, sfilter) {
                if (this.checkEmptyString(filter)) {
                    return this.checkEmptyString(filter)
                }
                if (this.checkEmptyString(sfilter)) {
                    if (this.checkEmptyString(filter)) {
                        return this.checkEmptyString(filter) + '+' + this.checkEmptyString(sfilter);
                    } else {
                        return  this.checkEmptyString(sfilter);
                    }
                }
            },
            getFilter: function (filter) {
                var filterParams = null;
                if (filter) {
                    if (Array.isArray(filter)) {
                        var arrayLength = filter.length;
                        for (var i = 0; i < arrayLength; i++) {
                            if (i > 0) {
                                filterParams += '&filter=';
                            }
                            filterParams += filter[i];
                        }
                    } else {
                        filterParams = filter;
                    }
                }
                return filterParams;
            },
            isEmpty: function (obj) {
                for (var prop in obj) {
                    if (obj.hasOwnProperty(prop))
                        return false;
                }
                return JSON.stringify(obj) === JSON.stringify({});
            },
            getParamString: function (paramArray) {
                var newParamStr = "";
                if (paramArray) {
                    for (var i = 0; i < paramArray.length; i++) {
                        if (i !== 0)
                            newParamStr += "&";
                        for (var j = 0; j < paramArray[i].length; j++) {
                            if (j !== 0)
                                newParamStr += ",";
                            newParamStr += paramArray[i][j];
                        }
                    }
                }
                return newParamStr;
            },
            getUrlFromParams: function (ob, op, numpage, rpp, ufilter, uorder) {
                var ruta = ob + '/' + op + '/' + numpage + '/' + rpp;
                ruta += "/" + this.getParamString(ufilter);
                ruta += "/" + this.getParamString(uorder);
                return ruta;
            }
        }
    }]);
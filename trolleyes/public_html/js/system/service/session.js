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
moduloServicios.factory('sessionService', function ($q, sessionServerCallService, $location) {
    var isSessionActiveTF = false;
    var sessionInfo = null;
    var nextUrl = null;
    //var that = this;
    return {
        anyAuthenticationPromise: function () {

            var deferred = $q.defer();
            sessionServerCallService.checkSession().then(function (response) {
                if (response['status'] == 200) {
                    isSessionActiveTF = true;
                    sessionInfo = response.data.json;
                    deferred.resolve();
                } else {
                    isSessionActiveTF = false;
                    deferred.resolve();
                    if (nextUrl != '/' && nextUrl != '/home' && nextUrl != '/login' && nextUrl != '/license' && !nextUrl.startsWith("/newalumno")) {
                        $location.path("/login");
                    }
                }
            }).catch(function (data) {
                isSessionActiveTF = false;
                deferred.resolve();
                if (nextUrl != '/' && nextUrl != '/home' && nextUrl != '/login' && nextUrl != '/license' && !nextUrl.startsWith("/newalumno")) {
                    $location.path("/login");
                }
            });
            return deferred.promise;
        },
        authenticationPromise: function (id_tipousuario) {

            var deferred = $q.defer();
            sessionServerCallService.checkSession().then(function (response) {
                if (response['status'] == 200) {
                    if (response.data.json.obj_tipousuario.id <= id_tipousuario) {
                        isSessionActiveTF = true;
                        sessionInfo = response.data.json;
                        deferred.resolve();
                    } else {
                        deferred.resolve();
                        if (nextUrl != '/' && nextUrl != '/home' && nextUrl != '/login' && nextUrl != '/license' && !nextUrl.startsWith("/newalumno")) {
                            $location.path("/login");
                        }
                    }
                } else {
                    isSessionActiveTF = false;
                    deferred.resolve();
                    if (nextUrl != '/' && nextUrl != '/home' && nextUrl != '/login' && nextUrl != '/license' && !nextUrl.startsWith("/newalumno")) {
                        $location.path("/login");
                    }
                }
            }).catch(function (data) {
                isSessionActiveTF = false;
                deferred.resolve();
                if (nextUrl != '/' && nextUrl != '/home' && nextUrl != '/login' && nextUrl != '/license' && !nextUrl.startsWith("/newalumno")) {
                    $location.path("/login");
                }
            });
            return deferred.promise;
        },
        isSessionActive: function () {
            return isSessionActiveTF;
        },
        setSessionInactive: function () {
            isSessionActiveTF = false;
            sessionInfo = null;
        },
        setSessionActive: function () {
            isSessionActiveTF = true;
        },
        getSessionInfo: function () {
            return sessionInfo;
        },
        setSessionInfo: function (value) {
            sessionInfo = value;
        },
        setNextURL: function (value) {
            nextUrl = value;
        }
    };
});
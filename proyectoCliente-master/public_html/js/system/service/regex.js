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
moduloServicios.factory('regexService', function () {
    return {
        getRegExpr: function (reg) {
            switch (reg) {
                case "nombre":
                    return /^([A-Z]{1}[a-zñáéíóúàèò]+[\s]*)+$/;
                    break;
                case "palabra":
                    return '^([a-z]{1}[a-zñáéíóúàèò]+[\s]*)+$';
                    break;
                case "codigopostal":
                    return '^\d{4,5}$';
                    break;
                case "email":
                    return  '^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$';
                    //return new RegExp("([\w-\.]+@[\w\.]+\.{1}[\w]+)", "g");
                    break;
                case "telefono":
                    return  '^[\d]{3}[-]*([\d]{2}[-]*){2}[\d]{2}$';
                    break;
                case "login":
                    return  '^[a-z0-9_-]{5,16}$';
                    break;
                case "password":
                    return  '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$';
                    break;
                case "integer":
                    return new RegExp("-?[0-9]+", "g");
                    break;
                case "decimal":
                    return '^\d+(?:\.\d{1,2})?$';
                    break;
                case "alpha-numeric":
                    return new RegExp("^[a-zA-Z0-9]+$", "g");
                    break;
                case "url":
                    return new RegExp("(http://|ftp://)([\w-\.)(\.)([a-zA-Z]+)", "g");
                    break;
                case "dni":
                    return /^[0-9]{8,8}[A-Z]$/;
                    break;
                case "dni2":
                    return new RegExp("^[0-9]e{8,8}[A-Z]$", "g");
                    break;
                default:
                    return null;
            }
        },
        getRegExpl: function (reg) {
            switch (reg) {
                case "nombre":
                    return "Las palabras deben comenzar con mayúsculas";
                    break;
                case "palabra":
                    return "No se pueden introducir números, solo palabras en minúscula";
                    break;
                case "codigopostal":
                    return "Se requieren 4 o 5 dígitos";
                    break;
                case "email":
                    return  "Introduzca un email válido";
                    break;
                case "telefono":
                    return  "Introduzca un número de 9 dígitos";
                    break;
                case "login":
                    return  "Introduza una palabra de 5 a 16 caracteres alfanuméricos";
                    break;
                case "password":
                    return  "Introduzca palabra de al menos 8 caracteres con numeros y letras mayúsculas y minúsculas";
                    break;
                case "integer":
                    return "Introduzca un número entero";
                    break;
                case "decimal":
                    return "Introduzca un número decimal (decimal=punto) con dos decimales";
                    break;
                case "alpha-numeric":
                    return "Introduzca una cadena de números y letras";
                    break;
                case "url":
                    return "Introduza una URL válida";
                    break;
                case "dni":
                    return "Introduzca un DNI de 8 digitos y una letra mayúscula."
                    break;
                default:
                    return null;
            }
        }
    };
});
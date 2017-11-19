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
var anyAuthenticationPromise = function (sessionService) {
    return sessionService.anyAuthenticationPromise();
};
var authenticationAdministratorPromise = function (sessionService) {
    return sessionService.authenticationPromise(1);
};
var authenticationClientPromise = function (sessionService) {
    return sessionService.authenticationPromise(2);
};
trolleyes.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {templateUrl: 'js/system/shared/home.html', controller: 'HomeController', resolve: {auth: anyAuthenticationPromise}});
        //------------
        $routeProvider.when('/login', {templateUrl: 'js/system/shared/login.html', controller: 'LoginController', resolve: {auth: anyAuthenticationPromise}});
        $routeProvider.when('/profile', {templateUrl: 'js/system/shared/profile.html', controller: 'ProfileController', resolve: {auth: anyAuthenticationPromise}});
        $routeProvider.when('/logout', {templateUrl: 'js/system/shared/logout.html', controller: 'LogoutController', resolve: {auth: anyAuthenticationPromise}});
        $routeProvider.when('/home', {templateUrl: 'js/system/shared/home.html', controller: 'HomeController', resolve: {auth: anyAuthenticationPromise}});
        $routeProvider.when('/license', {templateUrl: 'js/system/shared/license.html', controller: 'LicenseController', resolve: {auth: anyAuthenticationPromise}});
        $routeProvider.when('/passchange', {templateUrl: 'js/system/shared/passchange.html', controller: 'PasschangeController', resolve: {auth: anyAuthenticationPromise}});
        //------------
        $routeProvider.when('/usuario/1/view/:id', {templateUrl: 'js/app/usuario/1/view.html', controller: 'UsuarioView1Controller', resolve: {auth: authenticationAdministratorPromise}});
        $routeProvider.when('/usuario/1/new/:id?', {templateUrl: 'js/app/usuario/1/new.html', controller: 'UsuarioNew1Controller', resolve: {auth: authenticationAdministratorPromise}});
        $routeProvider.when('/usuario/1/edit/:id', {templateUrl: 'js/app/usuario/1/edit.html', controller: 'UsuarioEdit1Controller', resolve: {auth: authenticationAdministratorPromise}});
        $routeProvider.when('/usuario/1/remove/:id', {templateUrl: 'js/app/usuario/1/remove.html', controller: 'UsuarioRemove1Controller', resolve: {auth: authenticationAdministratorPromise}});
        $routeProvider.when('/usuario/1/plist/:page?/:rpp?', {templateUrl: 'js/app/usuario/1/plist.html', controller: 'UsuarioPList1Controller', resolve: {auth: authenticationAdministratorPromise}});
        $routeProvider.when('/usuario/1/plistXtipousuario/:id_tipousuario/:page?/:rpp?', {templateUrl: 'js/app/usuario/1/Xtipousuario/plist.html', controller: 'UsuarioXtipousuarioPList1Controller', resolve: {auth: authenticationAdministratorPromise}});
        $routeProvider.when('/usuario/1/newXtipousuario/:id_tipousuario', {templateUrl: 'js/app/usuario/1/Xtipousuario/new.html', controller: 'UsuarioXtipousuarioNew1Controller', resolve: {auth: authenticationAdministratorPromise}});
        //------------
        $routeProvider.when('/usuario/2/edit/:id', {templateUrl: 'js/app/usuario/2/edit.html', controller: 'UsuarioEdit2Controller', resolve: {auth: authenticationClientPromise}});
        //------------
        $routeProvider.when('/tipousuario/1/view/:id', {templateUrl: 'js/app/tipousuario/1/view.html', controller: 'TipousuarioView1Controller', resolve: {auth: authenticationAdministratorPromise}});
        $routeProvider.when('/tipousuario/1/new/:id?', {templateUrl: 'js/app/tipousuario/1/new.html', controller: 'TipousuarioNew1Controller', resolve: {auth: authenticationAdministratorPromise}});
        $routeProvider.when('/tipousuario/1/edit/:id', {templateUrl: 'js/app/tipousuario/1/edit.html', controller: 'TipousuarioEdit1Controller', resolve: {auth: authenticationAdministratorPromise}});
        $routeProvider.when('/tipousuario/1/remove/:id', {templateUrl: 'js/app/tipousuario/1/remove.html', controller: 'TipousuarioRemove1Controller', resolve: {auth: authenticationAdministratorPromise}});
        $routeProvider.when('/tipousuario/1/plist/:page?/:rpp?', {templateUrl: 'js/app/tipousuario/1/plist.html', controller: 'TipousuarioPList1Controller', resolve: {auth: authenticationAdministratorPromise}});
        //--
        $routeProvider.when('/pedido/1/view/:id', {templateUrl: 'js/app/pedido/1/view.html', controller: 'PedidoView1Controller', resolve: {auth: authenticationAdministratorPromise}});
        $routeProvider.when('/pedido/1/new/:id?', {templateUrl: 'js/app/pedido/1/new.html', controller: 'PedidoNew1Controller', resolve: {auth: authenticationAdministratorPromise}});
        $routeProvider.when('/pedido/1/edit/:id', {templateUrl: 'js/app/pedido/1/edit.html', controller: 'PedidoEdit1Controller', resolve: {auth: authenticationAdministratorPromise}});
        $routeProvider.when('/pedido/1/remove/:id', {templateUrl: 'js/app/pedido/1/remove.html', controller: 'PedidoRemove1Controller', resolve: {auth: authenticationAdministratorPromise}});
        $routeProvider.when('/pedido/1/plist/:page?/:rpp?', {templateUrl: 'js/app/pedido/1/plist.html', controller: 'PedidoPList1Controller', resolve: {auth: authenticationAdministratorPromise}});
        $routeProvider.when('/pedido/1/plistXusuario/:id_usuario/:page?/:rpp?', {templateUrl: 'js/app/pedido/1/Xusuario/plist.html', controller: 'PedidoXusuarioPList1Controller', resolve: {auth: authenticationAdministratorPromise}});
        $routeProvider.when('/pedido/1/newXusuario/:id_usuario', {templateUrl: 'js/app/pedido/1/Xusuario/new.html', controller: 'PedidoXusuarioNew1Controller', resolve: {auth: authenticationAdministratorPromise}});
        //--
        $routeProvider.when('/pedido/2/view/:id', {templateUrl: 'js/app/pedido/2/view.html', controller: 'PedidoView2Controller', resolve: {auth: authenticationClientPromise}});
        $routeProvider.when('/pedido/2/plist/:page?/:rpp?', {templateUrl: 'js/app/pedido/2/plist.html', controller: 'PedidoPList2Controller', resolve: {auth: authenticationClientPromise}});
        //--
        $routeProvider.when('/producto/1/view/:id', {templateUrl: 'js/app/producto/1/view.html', controller: 'ProductoView1Controller', resolve: {auth: authenticationAdministratorPromise}});
        $routeProvider.when('/producto/1/new/:id?', {templateUrl: 'js/app/producto/1/new.html', controller: 'ProductoNew1Controller', resolve: {auth: authenticationAdministratorPromise}});
        $routeProvider.when('/producto/1/edit/:id', {templateUrl: 'js/app/producto/1/edit.html', controller: 'ProductoEdit1Controller', resolve: {auth: authenticationAdministratorPromise}});
        $routeProvider.when('/producto/1/remove/:id', {templateUrl: 'js/app/producto/1/remove.html', controller: 'ProductoRemove1Controller', resolve: {auth: authenticationAdministratorPromise}});
        $routeProvider.when('/producto/1/plist/:page?/:rpp?', {templateUrl: 'js/app/producto/1/plist.html', controller: 'ProductoPList1Controller', resolve: {auth: authenticationAdministratorPromise}});
        //--
        $routeProvider.when('/producto/2/view/:id', {templateUrl: 'js/app/producto/2/view.html', controller: 'ProductoView2Controller', resolve: {auth: authenticationClientPromise}});
        $routeProvider.when('/producto/2/plist/:page?/:rpp?', {templateUrl: 'js/app/producto/2/plist.html', controller: 'ProductoPList2Controller', resolve: {auth: authenticationClientPromise}});
        //--
        $routeProvider.when('/linea_pedido/1/view/:id', {templateUrl: 'js/app/linea_pedido/1/view.html', controller: 'Linea_pedidoView1Controller', resolve: {auth: authenticationAdministratorPromise}});
        $routeProvider.when('/linea_pedido/1/new/:id?', {templateUrl: 'js/app/linea_pedido/1/new.html', controller: 'Linea_pedidoNew1Controller', resolve: {auth: authenticationAdministratorPromise}});
        $routeProvider.when('/linea_pedido/1/edit/:id', {templateUrl: 'js/app/linea_pedido/1/edit.html', controller: 'Linea_pedidoEdit1Controller', resolve: {auth: authenticationAdministratorPromise}});
        $routeProvider.when('/linea_pedido/1/remove/:id', {templateUrl: 'js/app/linea_pedido/1/remove.html', controller: 'Linea_pedidoRemove1Controller', resolve: {auth: authenticationAdministratorPromise}});
        $routeProvider.when('/linea_pedido/1/plist/:page?/:rpp?', {templateUrl: 'js/app/linea_pedido/1/plist.html', controller: 'Linea_pedidoPList1Controller', resolve: {auth: authenticationAdministratorPromise}});
        $routeProvider.when('/linea_pedido/1/plistXpedido/:id_pedido/:page?/:rpp?', {templateUrl: 'js/app/linea_pedido/1/Xpedido/plist.html', controller: 'Linea_pedidoXpedidoPList1Controller', resolve: {auth: authenticationAdministratorPromise}});
        $routeProvider.when('/linea_pedido/1/newXpedido/:id_pedido', {templateUrl: 'js/app/linea_pedido/1/Xpedido/new.html', controller: 'Linea_pedidoXpedidoNew1Controller', resolve: {auth: authenticationAdministratorPromise}});
        $routeProvider.when('/linea_pedido/1/plistXproducto/:id_producto/:page?/:rpp?', {templateUrl: 'js/app/linea_pedido/1/Xproducto/plist.html', controller: 'Linea_pedidoXproductoPList1Controller', resolve: {auth: authenticationAdministratorPromise}});
        $routeProvider.when('/linea_pedido/1/newXproducto/:id_producto', {templateUrl: 'js/app/linea_pedido/1/Xproducto/new.html', controller: 'Linea_pedidoXproductoNew1Controller', resolve: {auth: authenticationAdministratorPromise}});
        //--
        $routeProvider.when('/linea_pedido/2/view/:id', {templateUrl: 'js/app/linea_pedido/2/view.html', controller: 'Linea_pedidoView2Controller', resolve: {auth: authenticationClientPromise}});
        $routeProvider.when('/linea_pedido/2/plist/:page?/:rpp?', {templateUrl: 'js/app/linea_pedido/2/plist.html', controller: 'Linea_pedidoPList2Controller', resolve: {auth: authenticationClientPromise}});
        $routeProvider.when('/linea_pedido/2/newXproducto/:id_producto', {templateUrl: 'js/app/linea_pedido/2/Xproducto/new.html', controller: 'Linea_pedidoXproductoNew2Controller', resolve: {auth: authenticationClientPromise}});
        $routeProvider.when('/linea_pedido/2/plistXproducto/:id_producto/:page?/:rpp?', {templateUrl: 'js/app/linea_pedido/2/Xproducto/plist.html', controller: 'Linea_pedidoXproductoPList2Controller', resolve: {auth: authenticationClientPromise}});
        $routeProvider.when('/linea_pedido/2/newXpedido/:id_pedido', {templateUrl: 'js/app/linea_pedido/2/Xpedido/new.html', controller: 'Linea_pedidoXpedidoNew2Controller', resolve: {auth: authenticationClientPromise}});
        $routeProvider.when('/linea_pedido/2/plistXpedido/:id_pedido/:page?/:rpp?', {templateUrl: 'js/app/linea_pedido/2/Xpedido/plist.html', controller: 'Linea_pedidoXpedidoPList2Controller', resolve: {auth: authenticationClientPromise}});
        //--
        $routeProvider.when('/carrito/2/plist/:page?/:rpp?', {templateUrl: 'js/app/carrito/2/plist.html', controller: 'CarritoPList2Controller', resolve: {auth: authenticationClientPromise}});
        $routeProvider.when('/carrito/2/remove/:id', {templateUrl: 'js/app/carrito/2/remove.html', controller: 'CarritoRemove2Controller', resolve: {auth: authenticationClientPromise}});
        $routeProvider.when('/carrito/2/empty/', {templateUrl: 'js/app/carrito/2/empty.html', controller: 'CarritoEmpty2Controller', resolve: {auth: authenticationClientPromise}});
        $routeProvider.when('/carrito/2/buy/:page?/:rpp?', {templateUrl: 'js/app/carrito/2/buy.html', controller: 'CarritoBuy2Controller', resolve: {auth: authenticationClientPromise}});
        //--
        $routeProvider.otherwise({redirectTo: '/'});
    }]);
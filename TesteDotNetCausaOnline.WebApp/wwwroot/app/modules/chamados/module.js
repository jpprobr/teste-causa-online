
(function () {
    'use strict';
    
    //angular.module("ClientApp", ["ngRoute", "UtilControls", "ngStorage"])

    angular.module("ClientApp")
        .config(function ($routeProvider) {
          $routeProvider
            .when('/', {
                templateUrl: '/app/modules/chamados/view.lista.html',
                controller: 'ControllerListar',
                controllerAs: 'vm',
                title: 'Lista Chamados'
            })
            .when('/cadastrar', {
                templateUrl: '/app/modules/chamados/view.cadastro.html',
                controller: 'ControllerCadastrar',
                controllerAs: 'vm',
                title: 'Cadastrar Chamado'
            })
            .when('/editar/:id', {
                templateUrl: '/app/modules/chamados/view.cadastro.html',
                controller: 'ControllerEditar',
                controllerAs: 'vm',
                title: 'Editar Chamado'
            })
            .when('/exibir/:id', {
                templateUrl: '/app/modules/chamados/view.exibicao.html',
                controller: 'ControllerExibir',
                controllerAs: 'vm',
                title: 'Exibir Chamado'
            });

          //$httpProvider.interceptors.push('AuthInterceptor');

        })

        //.run(function ($rootScope, $location, AuthService) {
        //    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        //        if (next.authorize) {
        //            if (!AuthService.getToken()) {
        //                /* Ugly way
        //                event.preventDefault();
        //                $location.path('/login');
        //                ========================== */

        //                $rootScope.$evalAsync(function () {
        //                    $location.path('/login');
        //                })
        //            }
        //        }
        //    });

          
})();
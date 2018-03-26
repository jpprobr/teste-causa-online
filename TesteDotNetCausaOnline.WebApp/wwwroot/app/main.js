(function () {
    'use strict';

    // Temp Teste
    alert('app => ' + testGlobal)


    //var app = angular.module('ClientApp', ['ngRoute', 'UtilControls']);
    
    angular.module('ClientApp')
        .factory('AuthInterceptor', AuthInterceptor)
        .config(function ($httpProvider) {

            // Adiciona interceptor de auth
            $httpProvider.interceptors.push('AuthInterceptor');
        });


    // Interceptor 
    function AuthInterceptor($location, AuthService, $q) {
        return {
            request: function (config) {
                config.headers = config.headers || {};

                if (AuthService.getToken()) {

                    // Monta/seta flag de autorização p/ usar Bearer Token
                    config.headers['Authorization'] = 'Bearer ' + AuthService.getToken();
                }

                return config;
            },
            responseError: function (response) {

                // Verifica status de acesso não autorizado / proibido
                if (response.status === 401 || response.status === 403) {

                    // Redireciona p/ tela de Login
                    $location.path('/login');
                }

                return $q.reject(response);
            }
        }
    }

    /*
    angular.module('app', [])
        .run(function ($rootScope, $location, AuthService) {
            $rootScope.$on('$routeChangeStart', function (event, next, current) {

                if (next.authorize) {

                    if (!AuthService.getToken()) {

                        $rootScope.$evalAsync(function () {
                            $location.path('/login');
                        })
                    }
                }
            });

        });
    */


})();
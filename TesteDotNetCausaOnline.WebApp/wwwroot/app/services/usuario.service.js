(function () {
    'use strict';

    angular
        .module('ClientApp')
        .service('UsuarioService', function ($http, $q) {
            
            // Serviço p/ buscar usuário atual
            this.getCurrentUser = function () {

                var usuario = {};

                //var defer = $q.defer();

                // Executa request
                var promise =  $http.get('/api/account/currentUser')
                                .then(function (response) {

                                    usuario = response.data;
                                    usuario.logado = true;

                                    return usuario;
                                    //defer.resolve('defer resolv success!');

                                }, function (httpError) {
                                    throw httpError.status;
                                });

                //return defer.promise;
                return promise;
            };
        });


})();
(function () {
    'use strict';

    angular
        .module("ClientApp")
        .controller('ControllerLogin', ControllerLogin);

    // Injeta serviços
    ControllerLogin.$inject = ['$location', '$scope', '$http', 'AuthService'];


    function ControllerLogin($location, $scope, $http, AuthService) {
        /* jshint validthis:true */

        // Define variáveis
        var vm = this;
        vm.errorMessage = "";
        vm.isLoading = false;

        vm.conta = {};
     


        // Função Iniciar
        var iniciar = function () {

            if (AuthService.isLoggedIn()) {

                alertify.message("Acessando, aguarde...");

                //$location.path('/Home/Index');
                //window.location = window.location.pathname + '/Account#!/login';
                //window.location.href = "/";
                window.location.replace('/');
            }

            vm.titulo = "Login";
            vm.subtitulo = "Entre com seus dados de acesso";
        };

      

        // Função Login
        vm.login = function () {

            vm.isLoading = true;

            // Login
            AuthService.login(vm.conta)
                .then(function (response) {

                    if (response.status === 200 && response.data && response.data.accessToken) {

                        AuthService.setUsername(vm.conta.email);
                        AuthService.setToken(response.data.accessToken);

                        alertify.success('Login efetuado com sucesso!');
                        vm.errorMessage = "";
                        $location.path('/Home/Index');
                    }
                    else {
                        throw exc;
                    }
              })
                .catch(function (erro) {

                      console.log(" Status: " + erro.status + " / " + erro.statusText + ". Exc: " + erro.data.exc);
                      vm.errorMessage = erro.data.message + " Verifique se os dados de acesso estão corretos.";
                      alertify.error(erro.data.message);
                  })
                .finally(function () {
                    vm.isLoading = false;
                });
        };

        vm.getCurrentUser = function () {

            return AuthService.getUsername();
        };

        // Inicia controller
        iniciar();
    }

})();
(function () {
    'use strict';

    angular
        .module("ClientApp")
        .controller('ControllerSignup', ControllerSignup);

    // Injeta serviços
    ControllerSignup.$inject = ['$location', '$scope', '$http' ];


    function ControllerSignup($location, $scope, $http) {
        /* jshint validthis:true */

        // Define variáveis
        var vm = this;
        vm.errorMessage = "";
        vm.isLoading = false;

        vm.conta = {};


        // Função Iniciar
        var iniciar = function () {

            vm.titulo = "Criar Conta";
            vm.subtitulo = "Informe os dados da conta";
        };


        vm.validarLogin = function () {

            if (vm.conta.email && vm.conta.email != "" && vm.conta.email.length >= 6) {

                //vm.validacao.loginValido = false;
                vm.validacao.loginValido = true;
                vm.validacao.infoLogin = "";

                // Exibe loading
                vm.validacao.verificandoLogin = true;



                /*
                // Verifica Login no servidor
                $http.get("/api/auth?validarEmail=true&login=" + vm.conta.email)
                    .then(function (response, status) {

                        if (response === "Login existe") {

                            vm.validacao.infoLogin = "O Login informado não está disponível!";
                            vm.validacao.loginValido = false;
                        }
                        else {
                            vm.validacao.loginValido = true;
                        }
                    })
                    .catch(function (erro) {

                        vm.validacao.infoLogin = "Não foi possível verificar informações do Login no momento!";
                        vm.validacao.loginValido = false;
                    })
                    .finally(function () {
                        vm.validacao.verificandoLogin = false;
                    });*/
            }
            else {
                vm.validacao.loginValido = false;
            }
        };

        vm.validarLoginConfirm = function () {

            return (vm.conta.email === vm.conta.emailConfirm);
        };

        vm.validarSenhas = function () {

            return (vm.conta.password === vm.conta.passwordConfirm);
        };


        // Função Salvar
        vm.salvar = function () {

            vm.isLoading = true;

            // Insere/inscreve usuário //AuthService.signup(vm.conta);
            $http.post('/api/auth/signup', vm.conta)
                .then(function (response) {

                  alertify.success('Conta cadastrada com sucesso!');

                  $location.path('/login');
              })
              .catch(function (erro) {

                  console.log(" Status: " + erro.status + " / " + erro.statusText + ". Exc: " + erro.data.exc);
                  vm.errorMessage = "Oops! No momento não foi possível cadastrar a conta. Desc.: " + erro.data.exc.Message;
                  alertify.error(vm.errorMessage);
              })
              .finally(function () {
                  vm.isLoading = false;
              });
        };

        // Inicia controller
        iniciar();
    }

})();
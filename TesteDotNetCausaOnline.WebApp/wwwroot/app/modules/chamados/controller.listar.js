(function () {

    'use strict';

    angular
        .module("ClientApp")
        .controller('ControllerListar', ControllerListar);

    // Injeta serviços necessários
    //ControllerListar.$inject = ['$location', '$http', '$filter', 'ModalDelete'];
    ControllerListar.$inject = ['$location', '$http', '$filter', 'AuthService'];

    //function ControllerListar($location, $http, $filter, ModalDelete)
    function ControllerListar($location, $http, $filter, AuthService) {
        /* jshint validthis:true */

        // Define variáveis        
        var vm = this;
        var filter = $filter('filter');
        var apiPath = '/api/chamados/';
        vm.itens = [];
        vm.errorMessage = "";
        vm.search = "";
        vm.order = "Descricao";


        vm.infoUser = "";


        // Função Listar
        var listar = function () {

            vm.isLoading = true;

            $http.get(apiPath)
                .then(function (response) {

                    // Recebe dados 
                    vm.itens = response.data;
                })
                .catch(function (erro) {
                    console.log(" Status: " + status + " - Erro: " + erro);
                    vm.errorMessage = "No momento não foi possível obter dados.";
                    alertify.error(vm.errorMessage);
                })
                .finally(function () {
                    vm.isLoading = false;
                });
        };
             
        // Função Excluir
        vm.excluir = function (item) {

            // Exibe alerta p/ confirmação
            alertify.confirm('Exclusão de Chamado',
                '<p class="text-danger"><i class="fa fa-warning"></i> Tem certeza que deseja excluir o chamado N°' + item.numeroProcesso + ' ?</p>',
                function () { // Callback

                    vm.isLoading = true;

                    // Remove item
                    $http.delete(apiPath + item.numeroProcesso)
                        .then(function () {

                            // Recarrega View
                            listar();
                        })
                        .catch(function (erro) {

                            console.log(" Status: " + erro.status + " / " + erro.statusText + ". Exc: " + erro.data.exc);
                            vm.errorMessage = "Não foi possível remover este chamado. Desc.: " + erro.data.exc.Message;
                            alertify.error(vm.errorMessage);                            
                        })
                        .finally(function () {
                            vm.isLoading = false;
                        });
                },
                function () { }).set('labels', { ok: 'Confirmar', cancel: 'Cancelar' });
        };


        // Funcão Iniciar
        var iniciar = function () {

            vm.infoUser = AuthService.isLoggedIn() ? 'Olá, ' + AuthService.getUsername() : '--';

            listar();
        };


        // Inicia controller
        iniciar();
    }

})();

(function () {

    'use strict';

    angular
        .module("ClientApp")
        .controller('ControllerListar', ControllerListar);

    // Injeta serviços necessários
    ControllerListar.$inject = ['$location', '$http', '$filter'];

    function ControllerListar($location, $http, $filter)
    {
        /* jshint validthis:true */

        // Define variáveis        
        var vm = this;
        var filter = $filter('filter');
        var apiPath = '/api/categorias/';
        vm.itens = [];
        vm.errorMessage = "";
        vm.isLoading = true;       


        // Função Listar
        var listar = function () {
            
            // Busca Categorias
            $http.get(apiPath)
                .then(function (response) {

                    // Recebe dados
                    vm.itens = response.data;

                    vm.testResp = response;
                })
                .catch(function (erro, status) {

                    console.log(" Status: " + erro.status + " / " + erro.statusText + ". Exc: " + erro.data.exc);
                    vm.errorMessage = "No momento não foi possível obter dados. Desc.: " + erro.data.exc.Message;
                    alertify.error(vm.errorMessage);
                })
                .finally(function () {
                    vm.isLoading = false;
                });
        };


        // Função Excluir
        vm.excluir = function (item) {

            // Exibe alerta p/ confirmação
            alertify.confirm('Exclusão de Categoria',
                '<p class="text-danger"><i class="fa fa-warning"></i> Tem certeza que deseja excluir a categoria N°' + item.id + ' ?</p>',
                function () { // Callback

                    vm.isLoading = true;

                    // Remove item
                    $http.delete(apiPath + item.id)
                        .then(function () {

                            // Recarrega View
                            listar();
                        })
                        .catch(function (erro) {

                            console.log(" Status: " + erro.status + " / " + erro.statusText + ". Exc: " + erro.data.exc);
                            vm.errorMessage = "Não foi possível remover esta categoria. Desc.: " + erro.data.exc.Message;
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

            listar();
        };

        // Inicia controller
        iniciar();
    }

})();

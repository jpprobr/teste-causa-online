(function () {
    'use strict';

    angular
        .module("ClientApp")
        .controller('ControllerCadastrar', ControllerCadastrar);

    // Injeta serviços
    ControllerCadastrar.$inject = ['$location', '$scope', '$http'];


    function ControllerCadastrar($location, $scope, $http) {
        /* jshint validthis:true */

        // Define variáveis
        var vm = this;
        var apiPath = '/api/categorias/';
        vm.errorMessage = "";
        vm.item = { };
        vm.isLoading = false;


        // Função Iniciar
        var iniciar = function () {

            vm.titulo = "Nova Categoria";
            vm.subtitulo = "Informe os dados de cadastro";
        };

        // Função Salvar
        vm.salvar = function () {

            vm.isLoading = true;

            // Insere item
            $http.post(apiPath, vm.item)
                .then(function (response) {

                  alertify.success('Item cadastrado com sucesso!');
                  $location.path('/');
              })
              .catch(function (erro, status) {
                  console.log(" errorResponse: " + errorResponse.exc);
                  vm.errorMessage = "Nâo foi possível cadastrar a categoria.";
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
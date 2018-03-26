(function () {
    'use strict';

    angular
        .module("ClientApp")
        .controller('ControllerEditar', ControllerEditar);

    ControllerEditar.$inject = ['$location', '$scope', '$http', '$routeParams', '$filter'];


    function ControllerEditar($location, $scope, $http, $routeParams, $filter) {
        /* jshint validthis:true */

        // Define variáveis
        var vm = this;
        var apiPath = '/api/categorias/';
        vm.item = {};
        vm.errorMessage = "";
        vm.isLoading = false;


        // Obtem parâmetro id
        var id = $routeParams.id;


        // Função Listar por Id
        var listarPorId = function (id) {

            // Busca item correspondente por Id
            $http.get(apiPath + id)
              .then(function (response, status) {

                  // Recebe dados 
                  vm.item = response.data;
              })
              .catch(function (erro, status) {
                    vm.errorMessage = "Não foi possível obter os dados.";
                    console.log(" Status: " + status + " - Erro: " + erro);
                    alertify.error(vm.errorMessage);
               })
              .finally(function () {
                    vm.isLoading = false;
                });
        };

        // Função Iniciar
        var iniciar = function () {

            vm.titulo = "Editar Categoria";
            vm.subtitulo = "Atualize os dados de cadastro";

            listarPorId(id);
        };
        
        // Função Salvar
        vm.salvar = function () {

            vm.isLoading = true;

            // Atualiza item
            $http.put(apiPath + vm.item.id, vm.item)
                .then(function (response) {

                    alertify.success('Item atualizado com sucesso!');
                    $location.path('/');
                })
                .catch(function (erro, status) {
                    console.log(" errorResponse: " + errorResponse.exc);
                    vm.errorMessage = "Nâo foi possível atualizar a categoria.";
                    alertify.error(vm.errorMessage);
                })
                .finally(function () {
                    vm.isLoading = false;
                });;           
        };


        iniciar();
    }
})();

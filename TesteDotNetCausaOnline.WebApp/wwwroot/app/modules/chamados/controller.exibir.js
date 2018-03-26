(function () {
    'use strict';

    angular
        .module("ClientApp")
        .controller('ControllerExibir', ControllerExibir);

    ControllerExibir.$inject = ['$location', '$scope', '$http', '$routeParams', '$filter'];


    function ControllerExibir($location, $scope, $http, $routeParams, $filter) {
        /* jshint validthis:true */

        // Define variáveis
        var vm = this;
        vm.item = {};
        vm.errorMessage = "";
        vm.isLoading = false;

        vm.item = {};
        vm.item.Prioridade = {};
        vm.item.Categoria = {};


        // Obtem parâmetro id
        var id = $routeParams.id;


        var listarPorId = function (id) {

            // Busca item correspondente por Id
            $http.get('/api/chamados/' + id)
                .then(function (response, status) {

                      // Recebe dados 
                      vm.item = response.data;                    
                  },
                function (erro) {

                    console.log(" Status: " + erro.status + " / " + erro.statusText + ". Exc: " + erro.data.exc);
                    vm.errorMessage = "No momento não foi possível obter os dados. Desc.: " + erro.data.exc.Message;
                    alertify.error(vm.errorMessage);
                })
                .finally(function () {
                    vm.isLoading = false;
                });
        };

        var iniciar = function () {

            alertify.message('Aguarde...', 2);

            listarPorId(id);
        };


        iniciar();
    }
})();

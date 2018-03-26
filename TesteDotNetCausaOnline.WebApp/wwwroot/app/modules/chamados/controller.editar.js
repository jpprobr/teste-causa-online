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
        vm.item = {};
        vm.errorMessage = "";
        vm.isLoading = false;

        vm.item = {};
        vm.item.Prioridade = {};
        vm.item.Categoria = {};
        vm.novaCategoria = {};

        // Obtem parâmetro id
        var id = $routeParams.id;


        var listarPorId = function (id) {

            // Busca item correspondente por Id
            $http.get('/api/chamados/' + id)
                .then(function (response, status) {

                      // Recebe dados 
                      vm.item = response.data;

                      // Busca prioridades
                      $http.get('/api/prioridades')
                          .then(function (responsePrioridades) {

                              vm.prioridades = responsePrioridades.data;
                          },
                          function (erro, status) {
                              console.log(" Status: " + status + "Erro: " + erro);
                              vm.errorMessage = "No momento não foi possível obter dados de prioridades.";
                              alertify.error(vm.errorMessage);
                          });

                      // Busca categorias
                      $http.get('/api/categorias')
                          .then(function (responseCategorias) {

                              vm.categorias = responseCategorias.data;
                          },
                          function (erro, status) {
                              console.log(" Status: " + status + "Erro: " + erro);
                              vm.errorMessage = "No momento não foi possível obter dados de categorias.";
                              alertify.error(vm.errorMessage);
                          });
                  },
                function (erro, status) {
                    console.log(" Status: " + status + "Erro: " + erro);
                    vm.errorMessage = "No momento não foi possível obter os dados! Status.";
                    alertify.error(vm.errorMessage);
                })
                .finally(function () {
                    vm.isLoading = false;
                });
        };

        var iniciar = function () {

            vm.titulo = "Editar Chamado";
            vm.subtitulo = "Atualize os dados de cadastro";

            alertify.message('Aguarde...', 2);

            listarPorId(id);
        };


        vm.validarPrioridade = function () {
            return (vm.item.prioridade && vm.item.prioridade.id > 0);
        };

        vm.validarCategoria = function () {
            return (vm.item.categoria && vm.item.categoria.id > 0);
        };


        vm.validarNovaCategoria = function () {

            if (!vm.novaCategoria || !vm.novaCategoria.descricao || vm.novaCategoria.descricao.trim() == "") {

                vm.novaCategoria.alert = "Informe a Descrição para Nova Categoria";
                return false;
            }

            var existeCat = false; // ref. issue angular
            angular.forEach(vm.categorias, function (obj) {

                if (!existeCat && vm.novaCategoria.descricao.toLowerCase() == obj.descricao.toLowerCase())
                    existeCat = true;
            });

            if (existeCat) {
                vm.novaCategoria.alert = "Já existe uma categoria com este nome";
                return false;
            }

            vm.novaCategoria.alert = "";
            return true;
        };

        vm.exibirOpcaoNovaCategoria = function () {

            vm.opcaoNovaCategoria = true;
        };

        vm.adicionarCategoria = function (novaCat) {

            if (vm.validarNovaCategoria()) {

                vm.isLoading = true;

                // Insere Categoria
                $http.post('/api/categorias/', novaCat)
                    .then(function (response) {

                        if (response.status === 200 || response.status === 201) {

                            // Exibe info
                            alertify.success(novaCat.descricao + ' foi adicionada!');

                            // Atualiza controles
                            vm.opcaoNovaCategoria = false;
                            vm.novaCategoria.alert = "";
                            vm.novaCategoria = {};

                            // Recebe categoria salva
                            var categoriaSalva = response.data;

                            // Recarrega lista
                            listarCategorias(categoriaSalva);
                        }

                    }, function (erro) {

                        console.log(" Status: " + erro.status + " / " + erro.statusText + ". Exc: " + erro.data.exc);
                        vm.errorMessage = "Oops! No momento não foi possível adicionar a categoria. Desc.: " + erro.data.exc.Message;
                        alertify.error(vm.errorMessage);
                    })
                    .finally(function () {
                        vm.isLoading = false;
                    });
            }
        };


        vm.validar = function () {
            return (vm.validarPrioridade() && vm.validarCategoria());
        };
        
        vm.salvar = function () {

            // Exibe loading
            vm.isLoading = true;

            // Verifica/define alterações de seleção
            vm.item.urgencia = vm.item.prioridade.id;
            vm.item.idCategoria = vm.item.categoria.id;

            // Atualiza item
            $http.put('/api/chamados/' + vm.item.numeroProcesso, vm.item)
                .then(function (response) {  

                    alertify.success('Item atualizado com sucesso!');

                    $location.path('/');
                })
                .catch(function (erro) { 

                    console.log(" Status: " + erro.status + " / " + erro.statusText + ". Exc: " + erro.data.exc);
                    vm.errorMessage = "No momento não foi possível atualizar os dados. Desc.: " + erro.data.exc.Message;
                    alertify.error(vm.errorMessage);
                })
                .finally(function () {
                    vm.isLoading = false;
                });;           
        };

        iniciar();
    }
})();

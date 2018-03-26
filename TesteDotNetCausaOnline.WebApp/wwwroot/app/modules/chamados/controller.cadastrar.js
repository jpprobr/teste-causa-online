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
        vm.errorMessage = "";
        vm.isLoading = false;
        vm.opcaoNovaCategoria = false

        vm.item = {};
        //vm.item.Prioridade = {};
        //vm.item.Categoria = {};
        vm.item.prioridade = {};
        vm.item.categoria = {};
        vm.novaCategoria = {};
      

        var listarCategorias = function (categoriaDefault) {

            // Busca categorias
            $http.get('/api/categorias')
                .then(function (response) {

                    vm.categorias = response.data;

                    // Opção default
                    if (vm.categorias && vm.categorias.length > 0)
                        vm.item.categoria = (categoriaDefault && categoriaDefault.id > 0 ? categoriaDefault : vm.categorias[0]);
                },
                function (erro, status) {
                    console.log(" Status: " + status + "Erro: " + erro);
                    vm.errorMessage = "No momento não foi possível obter dados de categorias.";
                    alertify.error(vm.errorMessage);
                });
        };

        var listarPrioridades = function (prioridadeDefault) {

            // Busca prioridades
            $http.get('/api/prioridades')
                .then(function (response) {

                    vm.prioridades = response.data;

                    // Opção default
                    if (vm.prioridades && vm.prioridades.length > 0)
                        vm.item.prioridade = (prioridadeDefault && prioridadeDefault.id > 0 ? prioridadeDefault : vm.prioridades[0]);
                },
                function (erro, status) {
                    console.log(" Status: " + status + "Erro: " + erro);
                    vm.errorMessage = "No momento não foi possível obter dados de prioridades.";
                    alertify.error(vm.errorMessage);
                });
        }

        var iniciar = function () {

            vm.titulo = "Novo Chamado";
            vm.subtitulo = "Informe os dados de cadastro";

            alertify.message('Aguarde...', 2);

            listarPrioridades();

            listarCategorias();
        };


        vm.validarPrioridade = function () {
            //return (vm.item.Prioridade && vm.item.Prioridade.id > 0);
            return (vm.item.prioridade && vm.item.prioridade.id > 0);
        };

        vm.validarCategoria = function () {
            //return (vm.item.Categoria && vm.item.Categoria.id > 0);
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

            vm.isLoading = true;

            // Define urgência
            //vm.item.Urgencia = vm.item.Prioridade.id;
            vm.item.urgencia = vm.item.prioridade.id;

            // Insere item
            $http.post('/api/chamados/', vm.item)
                .then(function (response) {

                    alertify.success('Item cadastrado com sucesso!');
                    $location.path('/');

                }).catch(function (erro) {

                    console.log(" Status: " + erro.status + " / " + erro.statusText + ". Exc: " + erro.data.exc);
                    vm.errorMessage = "Não foi possível cadastrar o chamado. Desc.: " + erro.data.exc.Message;
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
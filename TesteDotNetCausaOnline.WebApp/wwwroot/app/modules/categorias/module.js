
(function () {
    'use strict';
    
    angular.module("ClientApp", ["ngRoute", "UtilControls", "ngStorage"])
      .config(function ($routeProvider) {
          $routeProvider
            .when('/', {
                templateUrl: '/app/modules/categorias/view.lista.html',
                controller: 'ControllerListar',
                controllerAs: 'vm',
                title: 'Lista de Categorias',
                authorize: true
            })
            .when('/cadastrar', {
                templateUrl: '/app/modules/categorias/view.cadastro.html',
                controller: 'ControllerCadastrar',
                controllerAs: 'vm',
                title: 'Cadastrar Categoria',
                authorize: true
            })
            .when('/editar/:id', {
                templateUrl: '/app/modules/categorias/view.cadastro.html',
                controller: 'ControllerEditar',
                controllerAs: 'vm',
                title: 'Editar Categoria',
                authorize: true
            });
      });
          
})();

(function () {
    'use strict';
    
    //angular.module("ClientApp", ['ngRoute', 'UtilControls', 'ngMask', 'ngStorage'])
    angular
        .module("ClientApp")
        .config(function ($routeProvider) {
          $routeProvider
              .when('/signup', {
                  templateUrl: '/app/modules/conta/view.signup.html',
                  controller: 'ControllerSignup',
                  controllerAs: 'vm',
                  title: 'Criar Conta'
              })
              .when('/login', {
                  templateUrl: '/app/modules/conta/view.login.html',
                  controller: 'ControllerLogin',
                  controllerAs: 'vm',
                  title: 'Login'
              });
      });
          
})();
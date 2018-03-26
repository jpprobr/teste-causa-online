(function () {
    'use strict';

    angular
        .module("ClientAppPartial")
        .controller('ControllerInfoLogin', ControllerInfoLogin);

    // Injeta serviços
    ControllerInfoLogin.$inject = ['$location', '$scope', '$http', 'AuthService'];


    function ControllerInfoLogin($location, $scope, $http, AuthService) {
        /* jshint validthis:true */

        // Define variáveis
        var vm = this;

        vm.isLoggedIn = AuthService.isLoggedIn();

        vm.infoUser = AuthService.isLoggedIn() ? 'Olá, ' + AuthService.getUsername() : '--';
    }
});
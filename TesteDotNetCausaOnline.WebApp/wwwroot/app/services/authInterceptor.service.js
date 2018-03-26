/// <reference path="../app.js" />
/// <reference path="auth.service.js" />

(function () {
    'use strict';

    angular
        .module("ClientApp")
        .factory('AuthInterceptor', AuthInterceptor);


    function AuthInterceptor($rootScope, $location, $localStorage, $q) {
        return {

            // Interceptor Request
            request: function (config) {
                config.headers = config.headers || {};

                if ($localStorage.token)
                    config.headers['Authorization'] = 'Bearer ' + $localStorage.token;

                return config;
            },

            // Interceptor Response
            responseError: function (response) {


                console.log('response = ' + response);

                if (response.status === 401 || response.status === 403) {

                    window.location = '/Account#!/login';
                }

                return $q.reject(response);
            }
        }
    }


})();
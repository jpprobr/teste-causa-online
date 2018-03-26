/// <reference path="../app.js" />

(function () {
    'use strict';

    angular
        .module("ClientApp")
        .factory('AuthService', AuthService);


    function AuthService($http, $localStorage, $q) {

        return {
            signup: function (data) {
                return $http.post('/api/auth/signup', data);
            },
            login: function (data) {
                return $http.post('/api/auth/login', data);
            },
            setUsername: function (username) {
                $localStorage.username = username;
            },
            setToken: function (token) {
                $localStorage.token = token;
            },
            getUsername: function () {
                return $localStorage.username;
            },
            getToken: function () {
                return $localStorage.token;
            },
            isLoggedIn: function () {
                let token = $localStorage.token;
                let username = $localStorage.username;

                return (token && username);
            },
            logout: function (data) {
                delete $localStorage.username;
                delete $localStorage.token;
                $q.when();
            }
        };
    }
   
})();
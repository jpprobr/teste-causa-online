'use strict';

const version = '1.0';

// Define módulo p/ App
var app = angular.module("ClientApp", ['ngRoute', 'UtilControls', 'ngMask', 'ngStorage']);

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
});


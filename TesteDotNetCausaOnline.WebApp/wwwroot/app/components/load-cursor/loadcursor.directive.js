// Load Cursor Directive

(function () {
    'use strict';

    angular.module('UtilControls', [])
        .directive('loadCursor', loadCursor);


    function loadCursor() {

        var diretiva = {
            templateUrl: '/app/components/load-cursor/loadCursor.view.html',
            restrict: 'E'
        };

        return diretiva;
    }

})();
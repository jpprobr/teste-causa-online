// Load Cursor Directive

(function () {
    'use strict';

    angular.module('UtilControls', [])
        .directive('showTab', showTab);


    function showTab() {

        var diretiva = {
            link: function (scope, element, attrs) {
                element.click(function(e) {
                    e.preventDefault();
                    $(element).tab('show');
                });
            }
        };
        
        return diretiva;
    }

})();
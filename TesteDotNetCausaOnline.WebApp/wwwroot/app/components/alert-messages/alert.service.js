'use strict';

angular
    .module("ClientApp")
    .service('Alert', ['$rootScope', '$compile',
    function ($rootScope, $compile) {

	    // Exibe Alerta
	    this.show = function (type, msg) {
	        /* TYPES = success | info | warning | danger */

	        if (type == 'error')
	            type = 'danger';

	        var tags = '<div id="appAlert" class="alert alert-' + type + ' alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' + msg + '</div>';

	        console.log(msg);

	        $("#alertArea").html(tags);
	        $("#appAlert").alert();
		};
	}
]);
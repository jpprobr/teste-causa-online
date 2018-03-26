'use strict';

angular
    .module("ClientApp")
    .service('ModalDelete', ['$rootScope', '$compile',
    function ($rootScope, $compile) {
        
        var modalConfig = {
            closeButtonText: 'Fechar',
            actionButtonText: 'Ok',
            headerText: 'Confirmar Ação',
            bodyText: 'Tem certeza?',
            items: {}
        };

        var montaModal = function (config) {
            var tags = '<div class="modal fade" id="appModal">';
            tags += '<div class="modal-dialog">';
            tags += '<div class="modal-content">';
            tags += '<div class="modal-header">';
            tags += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
            tags += '<h4 class="modal-title">' + config.headerText + '</h4>';
            tags += '</div>';
            tags += '<div class="modal-body">';
            tags += '<span class="glyphicon glyphicon-warning-sign"></span>';
            tags += '<span>' + config.bodyText + '</span>';

            // Verifica se há itens na mensagem
            if (config.items.length > 0) {
                // Monta Itens da Mensagem
                tags += '<ul>';
                angular.forEach(config.items, function (item) {
                    tags += '<li>' + item + '</li>';
                });
                tags += '</ul>';
            }

            tags += '</div>';
            tags += '<div class="modal-footer">';
            tags += '<button id="btConfirmar" type="button" class="btn btn-success" ng-click="execConfirm()"><i class="icon-ok"></i> ' + config.actionButtonText + '</button>';
            tags += '<button type="button" class="btn btn-danger" data-dismiss="modal"><i class="icon-reply"></i> ' + config.closeButtonText + '</button>';
            tags += '</div>';
            tags += '</div>';
            tags += '</div>';
            tags += '</div>';

            //$('#modalArea').html($compile(tags)(scope));
            var domCompiled = $compile(tags)($rootScope);
            $('#modalArea').html(domCompiled);
        };

        this.show = function (customModalConfig, confirmFunction, itensSel) {
            
            // Extende propriedades do Modal
            if (customModalConfig)
                angular.extend(modalConfig, customModalConfig);

            // Monta corpo do Modal
            montaModal(modalConfig);

            // Seta função de confirmação no rootScope
            $rootScope.execConfirm = function () {                
                confirmFunction(itensSel);
                $('#appModal').modal('hide');
            };

            // Exibe o Modal
            $('#appModal').modal('show');
        };
    }
]);
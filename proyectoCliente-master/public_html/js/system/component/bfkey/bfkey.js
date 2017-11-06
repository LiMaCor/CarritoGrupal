moduloDirectivas.component('bfKey', {
    templateUrl: "js/system/component/bfkey/bfkey.html",
    controllerAs: 'bfk',
    controller: bfkey,
    bindings:
            {
                bean: '=',
                name: '<',
                reference: '<',
                fname: '<'
            }

});

function bfkey(serverCallService, $uibModal, metaService)
{
    var self = this;

    self.icon = function (iname) {
        return  metaService.getMeta()[iname].icon;
    };

    self.chooseOne = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'js/system/templates/selection.html',
            // templateUrl: 'js/' + self.reference + '/selection.html',
            controller: toolService.capitalizeWord(self.reference) + "SelectionController",
            size: 'lg'
        }).result.then(function (modalResult)
        {
            // Pendiente de desarrollo en el servidor de un servicio específico de lectura y mofificación de ajenas 

            self.bean["obj_" + self.reference].id = modalResult;
            var jsonToSend = {json: angular.toJson(toolService.array_identificarArray(self.bean))};
            serverCallService.set(self.name, jsonToSend).then(function (response) {
                 $rootScope.$broadcast('reloadEvent');
               // location.reload();
            })
        });
    };

}
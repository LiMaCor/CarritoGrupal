

moduloDirectivas.component('texto', {
    templateUrl: "js/system/component/texto/texto.html",
    controllerAs: 'txt',
    bindings: {
        model: '=',
        name: '<',
        longname: '<',
        pattern: '<',
        length: '<',
        required: '<'
    }
});

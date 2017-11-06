moduloDirectivas.component('dateTimePicker', {
    templateUrl: "js/system/component/timepicker/timepicker.html",
    controllerAs: 'dtp',
    controller: datetimepicker,
    bindings: {
        name: '<',
        required: '<',
        model: '=',
        form: '='
    }
});
function datetimepicker() {
    var self = this;

//    self.$onInit = function () {
//        self.modelo = self.model;
//        self.model = moment(self.modelo, "DD/MM/YYYY HH:mm", true).format("YYYY-MM-DD HH:mm");
//    }

    self.change = function () {
        var fechaCompleta = moment(self.model, "DD/MM/YYYY hh:mm");
        var dayA = moment("01/01/1970 00:00", "DD/MM/YYYY hh:mm");
        var dayB = moment("31/12/2099 23:59", "DD/MM/YYYY hh:mm");
        var fechaHora = moment(self.model, "DD/MM/YYYY HH:mm", true).isValid();
        if ((fechaCompleta <= dayA || fechaCompleta >= dayB) || !fechaHora) {
            validity(false);
        } else {
            validity(true);
//            self.model = moment(self.modelo, "DD/MM/YYYY HH:mm", true).format("YYYY-MM-DD HH:mm");
        }
    }
    var validity = function (isValid) {
        if (self.form) {
            self.form[self.name].$setValidity('valid', isValid);
        }
    }
}
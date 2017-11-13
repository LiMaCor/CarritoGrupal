moduloDirectivas.component('datePicker', {
    templateUrl: "js/system/component/datepicker/datepicker.html",
    controllerAs: 'dt',
    controller: datepickerCtrl,
    bindings: {
        name: '<',
        required: '<',
        model: '=',
        form: '='
    }
});
function datepickerCtrl() {
    var self = this;
    self.change = function () {
        var strFecha = self.model;
        if (strFecha.length != 10) {
            validity(false);
        } else {
            var arrFecha = strFecha.split("/");
            if (arrFecha[0].length != 2 || arrFecha[1].length != 2 || arrFecha[2].length != 4) {
                validity(false);
            } else {
                var newDate = new Date(arrFecha[2], arrFecha[1] - 1, arrFecha[0]);
                if (newDate.getFullYear() == arrFecha[2] && newDate.getMonth() + 1 == arrFecha[1] && newDate.getDate() == arrFecha[0]) {
                    validity(true);
                } else
                    validity(false);
            }
        }
    };
    var validity = function (isValid) {
        if (self.form) {
            self.form[self.name].$setValidity('valid', isValid);
        }
    };
}

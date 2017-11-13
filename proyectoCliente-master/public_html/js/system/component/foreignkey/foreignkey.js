moduloDirectivas.component('foreignKey', {
    templateUrl: "js/system/component/foreignkey/foreignkey.html",
    controllerAs: 'fk',
    controller: foreignkeyController,
    bindings: {
        bean: '=',
        form: '<',
        name: '<',
        reference: '<',
        description: '<',
        profile: '<',
        required: '<'
    }
});

function foreignkeyController(toolService, serverCallService, $uibModal) {
    var self = this;
    console.log("leyendo controlador ...");

// $postLink $onInit  $onChanges  $onDestroy

    self.chooseOne = function () {
        console.log("chooseOne ...");
        var modalInstance = $uibModal.open({
            templateUrl: 'js/app/' + self.reference + '/' + self.profile + '/selection.html',
            controller: toolService.capitalizeWord(self.reference) + "Selection" + self.profile + "Controller",
            size: 'lg'
        }).result.then(function (modalResult) {
            self.change_value(modalResult);
        });
    };

//    this.$onChanges = function (changesObj) {
//        self.change(self.bean.id);
//    };

//    self.$doCheck = function () {
//        self.change(self.bean.id);
//    };

    var oldid = null;
    self.$doCheck = function () {
        console.log("doCheck ...");
        if (oldid == self.bean.id) {
            return
        } else {
            oldid = self.bean.id;
            console.log("foreign: " + self.bean.id);
            self.change_value(self.bean.id);
        }
    };

    self.change_value = function (id) {
        console.log("change_value ...");
        if (!self.required && (id <= 0 || id === "" || id === undefined)) {
            self.bean.id = null;
            validity(true);
            return;
        }
        if (self.bean.id > 0) {
            console.log("petcion: get " + self.reference + " " + id);
            serverCallService.getOne(self.reference, id).then(function (response) {
                console.log("llegan los valores...");
                var old_id = id;
                self.bean = response.data.json;
                console.log(self.bean);
                if (response.data.json.id <= 0) {
                    validity(false);
                    self.bean.id = old_id;
                } else {

                    validity(true);
                    if (Array.isArray(self.description)) {

                        self.desc = "";
                        for (var d in self.description) {
                            self.desc += self.bean[self.description[d]] + " ";
                        }
                    } else {
                        self.desc = self.bean[self.description];
                    }
                }
            }).catch(function (data) {
                validity(false);
            });
        }
    };

    var validity = function (isValid) {
        console.log("validity ..." + isValid);
        if (self.form[self.name]) {
            self.form[self.name].$setValidity('exists', isValid);
        }
    };

    this.$onInit = function () {
        console.log("on init llamando a change id=" + self.bean.id)
        self.change_value(self.bean.id);
    }
}



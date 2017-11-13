moduloDirectivas.component('header', {
    templateUrl: "js/system/component/header/header.html",
    controllerAs: 'hd',
    controller: menuCtrl,
    bindings:
            {
                ob: '<',
                title: '<'       
            }
});
function menuCtrl(objectService) {
    var self = this;
    this.$onInit = function () {
        self.objectName = objectService.getName(self.ob);
        self.icon = objectService.getIcon(self.ob);
    }

}

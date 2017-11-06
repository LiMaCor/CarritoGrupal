moduloDirectivas.component('miniactions', {
    templateUrl: "js/system/component/miniactions/miniactions.html",
    controllerAs: 'act',
    controller: miniactions,
    bindings:
            {
                id: '<',
                name: '<'
            }

});
function miniactions(constantService)
{
    var self = this;
    self.appurl = constantService.getCAppUrl();
}
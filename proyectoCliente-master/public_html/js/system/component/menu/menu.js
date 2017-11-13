moduloDirectivas.component('menu', {
    templateUrl: "js/system/component/menu/menu.html",
    controllerAs: 'mn',
    controller: menuCtrl
});

function menuCtrl(sessionService, objectService, $location) {
    var self = this;
    self.session_info = sessionService.getSessionInfo();
    self.isSessionActive = sessionService.isSessionActive();
    self.object_info = objectService;
    self.isActive = function (viewLocation) {
        //return viewLocation === $location.path();
        return $location.path().startsWith(viewLocation);
    };
}

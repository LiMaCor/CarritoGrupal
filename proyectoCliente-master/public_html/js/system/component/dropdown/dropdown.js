moduloDirectivas.component('dropdown', {
    templateUrl: "js/system/component/dropdown/dropdown.html",
    controllerAs: 'dd',
    bindings: {
        ide: '=',
        tablereference: '<'

    },
    controller: dropdown
});

function dropdown(serverCallService) {
    var self = this;
    this.$onInit = function () {
        serverCallService.getAll(self.tablereference).then(function (response) {
            self.data = response.data.message.data;
            self.metaobj = response.data.message.metaobj;
            self.metaprops = response.data.message.metaprops;
            self.selections = [];
            var arrayLength = self.data.length;
            for (var i = 0; i < arrayLength; i++) {
                var arrayLength2 = self.metaprops.length;
                for (var j = 0; j < arrayLength2; j++) {


                    if (self.metaprops[j].foreigndescription) {
                        var id = self.data[i]['id'];
                        var name = self.data[i][self.metaprops[j].name];
                        self.selections.push({'id': id, 'name': name});
                    }
                }

            }

        }).catch(function (data) {
            console.log(data);
        });
    };
//    self.$doCheck = function () {
//        console.log("change dropdown");
//    }
}


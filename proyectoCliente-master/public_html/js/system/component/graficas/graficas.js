/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

moduloDirectivas.component('graficas', {
    templateUrl: "js/system/component/graficas/graficas.html",
    controllerAs: 'gr',
    controller: graficas,
    bindings: {
        afechas: "=",
        aimportes: "=",
        fechadesde: "@",
        fechahasta: "@"

    }
});

function graficas($uibModal, $routeParams, $filter) {
    var self = this;
    console.log(self);
    self.graficaOn = false;

    self.formatearFecha = function (date) {

        var date = date;
        var datearray = date.split("/");

        return datearray[1] + '/' + datearray[0] + '/' + datearray[2];
    };

    self.filtrarFechas = function () {

        self.fechas = [];
        self.labels = [];
        self.data = [];
        self.fechasFinal = [];
        self.importes = [];
        self.importesFinal = [];
        self.fecha_desde;
        self.fecha_hasta;
        self.datos = true;

        var temp = 0;
        var imp = 0;
        for (var i = 0; i < self.afechas.length; i++) {
            for (var j = i + 1; j < self.afechas.length; j++) {
                if (self.afechas[i] > self.afechas[j]) {
                    //cambio fecha
                    temp = self.afechas[j];
                    self.afechas[j] = self.afechas[i];
                    self.afechas[i] = temp;
                    //cambio importe
                    imp = self.aimportes[j];
                    self.aimportes[j] = self.aimportes[i];
                    self.aimportes[i] = imp;
                }
            }
        }

        var hasta = self.formatearFecha(self.fechahasta);
        var desde = self.formatearFecha(self.fechadesde);
        var fecha_hasta = new Date(hasta);
        var fecha_desde = new Date(desde);

        var cont = 0;

        for (var i = 0; i < self.afechas.length; i++) {

            var newdate = self.formatearFecha(self.afechas[i]);

            date = new Date(newdate);

            if (date < fecha_hasta && date > fecha_desde) {

                date = $filter('date')(date, 'dd/MM/yyyy');
                self.fechasFinal.push(date);
                self.labels.push(self.fechasFinal[cont]);
                self.data.push(self.aimportes[i]);
                cont++;
            }

        }

    };

    self.datasetOverride = [{yAxisID: 'y-axis-1'}, {yAxisID: 'y-axis-2'}];
    self.options = {
        scales: {
            yAxes: [
                {
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left'
                },
                {
                    id: 'y-axis-2',
                    type: 'linear',
                    display: true,
                    position: 'right'
                }
            ]
        }
    };

    self.mostrarGrafica = function () {

        if (self.graficaOn == false) {
            self.filtrarFechas();
            self.graficaOn = true;
        } else {
            self.graficaOn = false;
        }

    };
}

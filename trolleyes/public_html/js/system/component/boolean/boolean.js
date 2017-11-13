moduloDirectivas.component("boolean", {
    templateUrl: 'js/system/component/boolean/boolean.html',
    controller: function boolean() {
    },
    controllerAs: 'bl',
    bindings: {
        model: '=',
        name: '<'
    }
});


/*
 * template use
<div ng-if="f.type == 'boolean'" class="form-group">
    <clabel wide="2" name="f.name" longname="f.longname" required="f.required"></clabel>
    <boolean 
        model="bean[f.name]"
        name="f.name">                                
    </boolean>
</div>
 */


/*
 * service.js 
{
name: "boolean_name", 
shortname: "short_boolean_name", 
longname: "long_boolean_name", 
visible: true, 
type: "boolean"
}
 */
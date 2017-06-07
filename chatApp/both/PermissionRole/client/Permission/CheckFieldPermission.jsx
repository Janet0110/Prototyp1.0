CheckFieldPermission = React.createClass({
    /*Initialisierung von ReactMeteorData, um in der Komponente Meteors-Methoden anwenden zu können*/
    mixins: [ReactMeteorData],
    /*holt sich die Berechtigung. Rollen werden im Bezug auf die Berechtigung überprüft. Falls die die Berechtigung einer Rolle zugeteilt ist, soll das Attribut der Checkbox als "checked" markiert werden */
    getMeteorData(){
        var perm = Permissions.findOne({$and: [{_id: this.props.permission}, {"roles": this.props.role}]});
        var checked = "";
        if(perm){
            checked ="checked";
        }else{
            checked = "";
        }
        return {
            checked: checked
        }
    },
    /*rendert die Checkbox für jeder Rolle und der dazugehörigen Berechtigung*/
    render() {
        return (
            <input id={this.props.permission} type="checkbox" checked = {this.data.checked} onClick={this.handleChange.bind(this, this.props.permission, this.props.role)} name={this.props.role}><label checked= {this.data.checked} id={this.props.role}></label></input>
        )
    },
    /*aktualisiert die Berechtigung für eine Rolle*/
    handleChange: function(permission, role, e){
        var change;
        if(this.data.checked === "checked"){
                change="pull"
            }else{
                change="push"
            }
        Meteor.call('updatePermission', permission, role, change);
    }
});
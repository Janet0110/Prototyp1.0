CheckFieldPermissionUserRoles = React.createClass({
    /*Initialisierung von ReactMeteorData, um in der Komponente Meteors-Methoden anwenden zu können*/
    mixins: [ReactMeteorData],
    /*Holt sich die Rolle des übergebenen Benutzers. Überprüft, ob Benutzer der Rolle zugewiesen wurde und markiert dazu das Checkbox-Feld dementsprecht*/
    getMeteorData(){
        var userRole = TeamsChannel.findOne({$and: [{userId: this.props.userId}, {"channels.id": this.props.channelId }, {'channels': {$elemMatch : {
            id: this.props.channelId, role: this.props.roleId
        }}}]});
        var checked = "";
        if(userRole){
            checked ="checked";
        }else{
            checked = "";
        }
        return {
            checked: checked
        }
    },
    /*rendert die Darstellung*/
    render() {
        return (
            <input type="checkbox"  checked={this.data.checked} onClick={this.handleChange.bind(this, this.props.userId, this.props.channelId, this.props.roleId)}><label id="admin" name="adminRole" checked= {this.data.checked}>{this.props.name}</label></input>
        )
    },
    /*aktualisiert die Channel-Rolle des Benutzers*/
    handleChange: function(userId, channelId, roleId){
        if(true){
            if(this.data.checked === "checked"){
                Meteor.call('removeUserFromChannelRole', roleId, currentTeamId(), userId, null, channelId);
            }else{
                Meteor.call('addUserToChannelRole', roleId, currentTeamId(), userId, null, channelId);
            }
        }
    }
});
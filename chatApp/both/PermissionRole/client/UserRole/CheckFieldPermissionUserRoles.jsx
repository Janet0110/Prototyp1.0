CheckFieldPermissionUserRoles = React.createClass({
    mixins: [ReactMeteorData],
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
    render() {
        return (
            <input type="checkbox"  checked={this.data.checked} onClick={this.handleChange.bind(this, this.props.userId, this.props.channelId, this.props.roleId)}><label id="admin" name="adminRole" checked= {this.data.checked}>{this.props.name}</label></input>
        )
    },
    handleChange: function(userId, channelId, roleId){
        console.log("userId: " + userId);
        console.log("channelId: " + channelId);
        console.log("roleId: " + roleId);
        if(true){
            if(this.data.checked === "checked"){
                Meteor.call('removeUserFromChannelRole', roleId, currentTeamId(), userId, null, channelId);
            }else{
                Meteor.call('addUserToChannelRole', roleId, currentTeamId(), userId, null, channelId);
            }
        }
//        var change;
//        if(this.data.checked === "checked"){
//            change="pull"
//        }else{
//            change="push"
//        }
//        Meteor.call('updatePermission', permission, role, change);
    }
});
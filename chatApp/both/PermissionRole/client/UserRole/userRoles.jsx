UserRoles = React.createClass({
    /*Initialisierung von ReactMeteorData, um in der Komponente Meteors-Methoden anwenden zu können*/
    mixins: [ReactMeteorData],
    /*holt sich alle Channels im Team sowie die Benutzer und die Rollen*/
    getMeteorData(){
        return{
            channels: Channels.find().fetch(),
            roles: getRolesCh(),
            users: Meteor.users.find({'_id': {$ne: User.id()}}).fetch(),
        }
    },
    /*Zustand für die Input-Feldert*/
    getInitialState: function(){
        return{
            selectValue: "",
            selectedChannelId : ""
        }
    },
    /*rendert die Darstellung*/
    render(){
        return (
            <div className="userRoles">
                <div className="userRolesTable">
                    <table className="bordered highlight">
                        <thead>
                        <tr>
                            <th>
                                <div className="input-field col s12 selectChannelDiv">
                                    <select className="selectChannel" value={this.state.selectValue} onChange={this.updateSelectValue}>
                                        <option value="" disabled selected>Choose a channel</option>
                                        {this.renderSelections()}
                                        <label>Materialize Select</label>
                                    </select>
                                </div>
                            </th>
                            {this.renderRoles()}
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderUsers()}
                        </tbody>
                    </table>
                    <div className="backLink">Back</div>
                </div>
            </div>
        )
    },
    /*iteriert das User-Objekt für den Renderprozess*/
    renderUsers: function(){
        var users = [];
        this.data.users.map((user) => {
            users.push(
                <tr className = "rows" id={user._id}>
                    <td><span className="username-text">{user.username}</span>
                        <CheckFieldPermissionUserRoles name="Admin"/>
                    </td>
                    {this.renderUserRoles(user._id)}
                </tr>
            );
        });
        return users;
    },
    /*Iteriert das userRoles-Objekt für den Renderprozess*/
    renderUserRoles: function(userId){
        var userRoles = [];
        this.data.roles.map((role) => {
            userRoles.push(
                <td>
                    <CheckFieldPermissionUserRoles name="" roleId={role._id} channelId={this.state.selectedChannelId} userId={userId} teamId={currentTeamId()}/>
                </td>
            );
        });
        return userRoles;
    },
    /*iteriert das RoleObjekt für den Renderprozess */
    renderRoles: function(){
        var roles = [];
        this.data.roles.map((role) => {
            roles.push(
                <th>{role._id}</th>
            );
        });
        return roles;
    },
    /*aktualisiert den Zustand für das Eingabefeld*/
    updateSelectValue: function(evt){
        var channelId = getChannelId(evt.target.value, currentTeamId());
        this.setState({
            selectValue: evt.target.value,
            selectedChannelId: channelId
        });

    },
    /*rendert die Auswahl an Channels im Select-Element*/
    renderSelections:function(){
        var channels = [];
        this.data.channels.map((channel) => {
            channels.push(
                <option value={channel.name} id={channel._id}>{channel.name}</option>
            );
        });
        return channels;
    }
});

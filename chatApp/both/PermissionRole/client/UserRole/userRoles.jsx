UserRoles = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){
        return{
            channels: Channels.find().fetch(),
            roles: getRolesCh(),
            users: Meteor.users.find({'_id': {$ne: User.id()}}).fetch(),
        }
    },
    getInitialState: function(){
        return{
            selectValue: "",
            selectedChannelId : ""
        }
    },
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
                        {/*{{#each users}}*/}
                        {/*<tr class = "rows" id={{_id}}>*/}
                        {/*<td><span class="username-text">{{username}}</span>*/}

                        {/*<!--<input type="radio" id="{{_id}}" name="globalRole" {{isTeamAdmin _id}}><label id="{{_id}}">{{_id}}</label>-->*/}
                        {/*<input type="checkbox"  checked={{isTeamAdmin _id}}><label id="admin" name="adminRole" checked= {{isTeamAdmin ../_id}}>Admin</label>*/}

                        {/*</td>*/}
                        {/*{{#each roles}}*/}
                        {/*{{#with userId = ../_id roleId = _id}}*/}
                        {/*<td><input id="{{_id}}"  checked={{permissionActive ../_id}} type="checkbox"><label id="{{this.roleId}}" checked = {{permissionActive ../_id}} name="channelRoles"></label></td>*/}
                        {/*{{/with}}*/}
                        {/*{{/each}}*/}
                        {/*</tr>*/}
                        {/*{{/each}}*/}
                        </tbody>
                    </table>
                    <div className="backLink">Back</div>
                </div>
            </div>
//    {{else}}
//    {{> notAuthorized}}
//    {{/if}}
        )
    },
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
    renderRoles: function(){
        var roles = [];
        this.data.roles.map((role) => {
            roles.push(
                <th>{role._id}</th>
            );
        });
        return roles;
    },
    updateSelectValue: function(evt){
        var channelId = getChannelId(evt.target.value, currentTeamId());
        this.setState({
            selectValue: evt.target.value,
            selectedChannelId: channelId
        });

    },
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

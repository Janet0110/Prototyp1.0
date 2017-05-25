PermissionsPage = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){
        return {
            team: Session.get("team"),
            rolesGl: getRolesGL(),
            permissionsGl: getPermissionsGL(),
            rolesCh: getRolesCh(),
            permissionsCh: getPermissionsCh()
        }
    },
    getInitialState: function(){
        var checked = new ReactiveVar("");
        return{
            checked
        }
    },
    render() {
        return (
            <div className='permissions'>
                <div className="permissionsTableGlobal">
                    <table className="bordered highlight">
                        <thead>
                        <tr>
                            <th>Global-Permissions</th>
                            {this.renderRolesGlobal()}
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderPermissionsGlobal()}
                        </tbody>
                    </table>
                    <br></br>
                </div>

                <div className="permissionsTable">
                    <table className="bordered highlight">
                        <thead>
                        <tr>
                            <th>Channel-Permissions</th>
                            {this.renderChannelRoles()}
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderChannelPermissions()}
                        </tbody>
                    </table>
                    <div className="backLink" onClick={this.backLink.bind(this)}>Back</div>
                </div>
            </div>
        );
    },
    backLink: function () {
        FlowRouter.go('channel', {team: Session.get("team"), channel: 'general'});
    },
    renderRolesGlobal: function () {
        var roles = [];
        this.data.rolesGl.map((role) => {
            roles.push(
                <th>{role.description}</th>
            );
        });
        return roles;
    },
    renderPermissionsGlobal: function () {
        var permissions = [];
        this.data.permissionsGl.map((permission) => {
            permissions.push(
                <tr className = "rows" id={permission._id}>
                    <td>{permission._id}</td>
                    {this.renderRolesGlobalForGlobalPermissions(permission._id)}
                </tr>
            )
        });
        return permissions;
    },
    renderRolesGlobalForGlobalPermissions: function(permissionsId){
        var roles = [];
        this.data.rolesGl.map((role) => {
            roles.push(
                <td><CheckFieldPermission role={role._id} permission={permissionsId}/></td>
            );
        });
        return roles;
    },
    renderChannelRoles: function() {
        var roles = [];
        this.data.rolesCh.map((role) => {
            roles.push(
                <th>{role.description}</th>
            );
        });
        return roles;
    },
    renderChannelPermissions: function(){
        var permissions = [];
        this.data.permissionsCh.map((permission) => {
            permissions.push(
                <tr className = "rows" id={permission._id}>
                    <td>{permission._id}</td>
                    {this.renderRolesChForPermissionsCh(permission._id)}
                </tr>
            )
        });
        return permissions;
    },
    renderRolesChForPermissionsCh: function(permissionId){
        var roles = [];

        this.data.rolesCh.map((role) => {
            roles.push(
                <td><CheckFieldPermission role={role._id} permission={permissionId}/></td>
            );
        });

        return roles;
    },
    permissionActive: function(permission, roleId){
        var perm = Permissions.findOne({$and: [{_id: permission}, {"roles": roleId}]});
        if(Permissions.findOne({$and: [{_id: permission}, {"roles": roleId}]})){
            console.log(permission + " + " + roleId + " checked" );
            this.setState({
                checked: {
                    permission: permissionId,
                    role: roleId
                }
            });
            return "checked"
        }
    }
});


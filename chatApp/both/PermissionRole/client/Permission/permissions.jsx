PermissionsPage = React.createClass({
    /*Initialisierung von ReactMeteorData, um in der Komponente Meteors-Methoden anwenden zu können*/
    mixins: [ReactMeteorData],
    /*holt sich Rollen und Berechtigungen für das aktuelle Team*/
    getMeteorData(){
        return {
            team: Session.get("team"),
            rolesGl: getRolesGL(),
            permissionsGl: getPermissionsGL(),
            rolesCh: getRolesCh(),
            permissionsCh: getPermissionsCh()
        }
    },
    /*Zustand für das Input-Check-Feld*/
    getInitialState: function(){
        var checked = new ReactiveVar("");
        return{
            checked
        }
    },
    /*rendert die Darstellung*/
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
    /*Handling für die Navigation, um zurück zur Chatinstanz zu kommen*/
    backLink: function () {
        FlowRouter.go('channel', {team: Session.get("team"), channel: 'general'});
    },
    /*rendert globale Rollen*/
    renderRolesGlobal: function () {
        var roles = [];
        this.data.rolesGl.map((role) => {
            roles.push(
                <th>{role.description}</th>
            );
        });
        return roles;
    },
    /*rendert globale Berechtigungen*/
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
    /*rendert Channel-Rollen*/
    renderChannelRoles: function() {
        var roles = [];
        this.data.rolesCh.map((role) => {
            roles.push(
                <th>{role.description}</th>
            );
        });
        return roles;
    },
    /*rendert Channel-Berechtigungen*/
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
    /*Überprüft ob Berechtigung für die Rolle aktiv ist*/
    permissionActive: function(permission, roleId){
        var perm = Permissions.findOne({$and: [{_id: permission}, {"roles": roleId}]});
        if(Permissions.findOne({$and: [{_id: permission}, {"roles": roleId}]})){
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


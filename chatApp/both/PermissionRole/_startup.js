/*definiert Berechtigungen und fügt Rollen der Berechtigung hinzu*/
if(Meteor.isServer){
    Meteor.startup(function(){
        permissions = [
            { _id: Perm.INVITE_USER,            roles : ['admin']},
            { _id: Perm.CREATE_CHANNEL,         roles : ['admin', 'user']},
            { _id: Perm.DELETE_CHANNEL,         roles : ['admin', 'owner']},
            { _id: Perm.JOIN_PRIVATE_CHANNEL,   roles : ['admin', 'owner', 'moderator', 'member']},
            { _id: Perm.ADD_USER_TO_CHANNEL,    roles : ['admin', 'owner', 'moderator']}
        ];

        defaultRoles = [
            { _id: 'admin',     description: 'Admin' },
            { _id: 'moderator', description: 'Moderator' },
            { _id: 'owner',     description: 'Owner' },
            { _id: 'member',    description: 'Member'},
            { _id: 'user',      description: 'User' }
        ];

        /*speichert Rollen in die Datenbank*/
        for(var i = 0; i < defaultRoles.length; i++){
            if(!Roles.findOne({_id: defaultRoles[i]._id})){
                Roles.insert({
                    _id: defaultRoles[i]._id,
                    description: defaultRoles[i].description
                })
            }
        }

        /*speichert Berechtigungen in die Datenbank*/
        for(var i = 0; i < permissions.length; i++){
            if(!Permissions.findOne({_id: permissions[i]._id})){
                Permissions.insert({
                    _id: permissions[i]._id,
                    roles: permissions[i].roles
                })
            }
        }
    }
);
}

if(Meteor.isServer){
    Meteor.startup(function(){
         permissions = [
            { _id: 'edit-message',      roles : ['admin', 'owner', 'moderator']},
            { _id: 'delete-message',    roles : ['admin', 'owner', 'moderator']},
            { _id: 'delete-room',       roles : ['admin', 'owner', 'moderator']},
            { _id: 'edit-room',         roles : ['admin', 'owner', 'moderator']},
            { _id: 'delete-room',       roles : ['admin', 'owner', 'moderator']},
            { _id: 'invite-user',       roles : ['admin', 'owner', 'moderator']},
            { _id: 'remove-user',       roles : ['admin', 'owner', 'moderator']},
            { _id: 'set-moderator',     roles : ['admin', 'owner']},
        ];

        defaultRoles = [
            { name: 'admin',     description: 'Admin' },
            { name: 'moderator', description: 'Moderator' },
            { name: 'owner',     description: 'Owner' },
            { name: 'user',      description: '' },
        ];
        if(!Roles.find({}).count()){
            Roles.insert(defaultRoles);
        }
        if(!Permissions.find({}).count()){
            Permissions.insert(permissions);
        }
    }
);
}

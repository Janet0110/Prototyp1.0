Meteor.methods({
    /*Aktualisiert die Berechtigung*/
    'updatePermission': function(permission, role, change){
        if(change === "pull"){
            Permissions.update(
                { _id: permission },
                { $pull: {roles: role}}
            );
        }

        if(change === "push"){
            Permissions.update(
                { _id: permission },
                { $push: {roles: role}}
            );
        }
    }
});
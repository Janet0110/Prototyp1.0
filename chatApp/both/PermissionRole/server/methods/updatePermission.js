Meteor.methods({
    'updatePermission': function(permission, role, change){
        console.log("perm: " + permission);
        console.log("role " + role);
        console.log("change: " + change);


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
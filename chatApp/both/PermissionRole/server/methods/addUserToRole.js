Meteor.methods({
    'addUserToRole': function(roleName, teamId, userId) {
        if (Meteor.userId()) {
            //globale Rollen ändern
            if (isAdmin(teamId, Meteor.userId())) {
                if(isTeamOwner(teamId, userId)==false){
                    if (roleName === Rol.ADMIN || roleName === Rol.USER) {
                        return Meteor.users.update({
                            _id: userId,
                            'teams': {$elemMatch: {id: teamId}}
                        }, {$set: {'teams.$.role': roleName}}, function (err) {
                            console.log(err);
                        })
                    }
                }
            } else {
                var opts = {
                    id: teamId,
                    role: roleName
                };
                return Meteor.users.update({_id: Meteor.userId()}, {$push: {teams: opts}}, function (err) {
                    console.log(err);
                });
            }
        }

    }
});
Meteor.methods({
    /*Überprüft, ob Benutzer, Admin im Team ist*/
    'isAdmin': function(teamId, userId){
        if(Meteor.userId()) {
            var user = Meteor.users.findOne({_id: userId, 'teams': {$elemMatch: {id: teamId, role: {$eq: Rol.ADMIN}}}});
            if(user){
                return true;
            }else{
                throw new Meteor.Error("not authorized");
            }
        }
    }
});
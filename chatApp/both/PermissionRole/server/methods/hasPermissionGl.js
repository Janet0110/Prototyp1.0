Meteor.methods({
    'hasPermission': function(permission, teamId,  userId ){
        if(Meteor.userId()){
            //is User admin or a user
            var user =  Meteor.users.findOne({$and: [{"_id": userId}, {'teams.id': teamId}]}, {fields:{
                'teams.role': 1,
                '_id': 0
            }});
            var usersRole = user.teams[0].role;
            var hasPermission  = Meteor.call('hasRolePermission', usersRole, permission);
            if(hasPermission){
                return true
            }else{
                return false
            }
        }
    }
});
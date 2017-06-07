Meteor.methods({
    /*Überpüft, ob Benutzer die Channel-Berechtigung hat*/
    'hasChannelPermission': function(permission, teamId,  userId , channelId){

        if(Meteor.userId()){
            if(!userId){
                throw new Meteor.Error("no specification for userId");
            }
            if(!channelId){
                throw new Meteor.Error("no specification for channelId");
            }
            if(!teamId){
                throw new Meteor.Error("no specification for teamId");
            }
            if(!permission){
                throw new Meteor.Error("no specification for permission");
            }

            if(isAdmin(teamId, userId)){
                return true;
            }

            var channel = Channels.findOne({_id: channelId, 'team._id': teamId});

//            if(!channel.private){
//                return true;
//            }

            var hasAccess = TeamsChannel.findOne({userId: userId, teamId: teamId, 'channels.id': channelId}, {fields:{
                _id: 0,
                'channels.id': 1,
                'channels.role': 1
            }});
            if(!hasAccess){
                throw new Meteor.Error("User has no Permission");
            }
            var userChannelsInTeam = hasAccess.channels;
            var usersRoleInChannel = null;

            for(var i = 0; i < userChannelsInTeam.length; i++){
                if(userChannelsInTeam[i].id === channelId){
                    usersRoleInChannel = userChannelsInTeam[i].role;
                }
            }
            if(usersRoleInChannel){
                var hasPerm =  hasPermission(usersRoleInChannel, permission);
                if(hasPerm){
                    return true;
                }else{
                    return false;
                }
            }else{
                throw new Meteor.Error("User has no indication for the role in this channel");
            }
        }
    }
});
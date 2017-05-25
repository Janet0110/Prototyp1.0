Meteor.methods({
    'removeUserFromChannelRole': function(roleName, teamId,  userId, username, channelName){

        var channel = null;
        channel = Channels.findOne({"name": channelName});
        if(!channel){
            channel = Channels.findOne(channelName);
        }
        if(Meteor.userId()){
            if(roleName === "admin" || roleName === "user"){
                return Meteor.users.update(
                    { _id: userId },
                    { $set: {"teams.role": roleName}}
                );
            }else{
                TeamsChannel.update({userId: userId}, {$pull: {"channels": {id: channel._id}}});
            }
        }
    }
});
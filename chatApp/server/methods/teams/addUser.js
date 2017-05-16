Meteor.methods({
    'team.addUser': function(opts, callback) {
        if (Teams.find({"users._id": opts.userId}).count() > 0) {
            throw new Meteor.Error("User already in team");
        }else{
            Teams.update({_id: opts.teamId}, { $addToSet: {
                'users': {
                    user: opts.userId
                }
            }});

            var allChannels = Channels.find({"team._id": opts.teamId}).fetch();

            for(var i = 0; i < allChannels.length; i++){
                if(allChannels[i].private == false){
                    Meteor.call("channel.addUser", allChannels[i]._id, opts.userId);
                    Meteor.call("addUserToChannelRole", Rol.MEMBER, opts.teamId,  opts.userId, opts.username, allChannels[i].name);
                }
            }
        }
    }
});

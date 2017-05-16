Meteor.methods({
    'channel.addUser': function (channelId, userId) {
            Channels.update({_id: channelId}, { $addToSet: {
                'users': {
                    user: userId
                }
            }});

//        if(users[i].user !== Meteor.userId()){
//            Meteor.call('addUserToChannelRole', role, teamId, users[i].user, null, channelName);
//        }
    },

    'channel.addUserWithRole': function(channelId, userId, teamId, role){
        var channel = Channels.findOne(channelId);

        var channelname = channel.name;
        Channels.update({_id: channelId}, { $addToSet: {
            'users': {
                user: userId
            }
        }});
        console.log(channel.name);
        Meteor.call('addUserToChannelRole', role, teamId, userId, null, channelname);
    }
});
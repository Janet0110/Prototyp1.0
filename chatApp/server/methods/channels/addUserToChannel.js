Meteor.methods({
    /*Fügt einen Benutzer zum Channel*/
    'channel.addUser': function (channelId, userId) {
        /*Aktualisiert Array mit Usern im Channel*/
            Channels.update({_id: channelId}, { $addToSet: {
                'users': {
                    user: userId
                }
            }});
    },

    /*weist dem Benutzer die übergebene Rolle zu*/
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
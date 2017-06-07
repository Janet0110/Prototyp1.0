Meteor.methods({
    /*Weist einem User in dem Team-Channel einer Channel-Rolle zu */
    'addUserToChannelRole': function(roleName, teamId,  userId, userName, channelIdName) {
        var user = null;
        /*Überprüfung der userId*/
        if(userId == null){
            user = Meteor.users.findOne({username: userName});
        }else if(userName == null){
            user = Meteor.users.findOne({_id: userId});
        }else{
            user = Meteor.users.findOne({_id:userId});
        }
        /*Überprüft ob Benutzer existiert*/
        if(!user){
            throw new Meteor.Error("User doesn't exists");
        }
        var channel = null;
        channel = Channels.findOne({name: channelIdName});
        if(!channel){
            channel = Channels.findOne(channelIdName);
        }
        /*Überprüft, ob es sich um einen authorisierten Benutzer handelt*/
        if (Meteor.userId()) {
            /*Überprüft, ob Benutzer im Channel bereits exisitert*/
            var channelExists = Meteor.users.find({_id: user._id, teams: {$elemMatch: {id: teamId, channels: {$elemMatch: {id: channel._id}}}}}).fetch();
            if(channelExists.length === 0){
                var opts = {
                    id: channel._id,
                    role: roleName
                };
                /*aktualisiert die Rolle für den Benutzer in User-Collection und TeamsChannel-Collection */
                Meteor.users.update({
                    _id: user._id,
                    'teams': {$elemMatch: {id: teamId}}
                }, {$push: {'teams.$.channels': opts}},{upsert: true}, function (err) {
                });

                TeamsChannel.update({
                    userId: user._id,
                    teamId: teamId},{$addToSet: {"channels": opts}}, {upsert: true})
            }else{
                /*Überprüft ob Benutzer im Team ist*/
                var userInTeam = Meteor.users.findOne({_id: user._id, teams: {$elemMatch: {id: teamId}}});
                if(!userInTeam){
                    throw new Meteor.Error("User is not in team");
                }
                /*Aktualisiert Channel mit der Rolle*/
                Channels.update(channel._id, {$push: {'users': {user: userId}}});
                var opts = {
                    id: channel._id,
                    role: roleName
                };


                var hasRoleInTeam = TeamsChannel.findOne({userId: user._id, teamId: teamId, "channels.id": channel._id});
                if(!hasRoleInTeam){
                    TeamsChannel.update({
                        userId: user._id,
                        teamId: teamId},{$addToSet: {"channels": opts}}, {upsert: true})
                }else{
                    TeamsChannel.update({
                        userId: user._id,
                        teamId: teamId, channels: {$elemMatch: {id: channel._id}}},{$set: {"channels.$.role": roleName}})
                }
            }
        }
    }
});


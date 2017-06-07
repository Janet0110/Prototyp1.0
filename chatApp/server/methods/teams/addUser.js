Meteor.methods({
    /*Fügt einen Benutzer dem Team hinzu*/
    'team.addUser': function(opts, callback) {
        /*Überprüft, ob sich Benutzer bereits schon im Team befindet*/
        if (Teams.find({"users._id": opts.userId}).count() > 0) {
            throw new Meteor.Error("User already in team");
        }else{
            /*aktualisiert Eintrag in MongoDB und fügt den Benutzer zur Liste in der Collection teams hinzu*/
            Teams.update({_id: opts.teamId}, { $addToSet: {
                'users': {
                    user: opts.userId
                }
            }});

            /*Hinzugügen der Channelrollen für das neue Mitglied (public)*/
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

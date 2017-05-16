Meteor.methods({
    'channels.add': function (teamId, channelName, isPrivate, callback) {
        var isPrivate = isPrivate;
        if(!isPrivate){
            isPrivate = false;
        }
        if (!this.userId) {
            throw new Meteor.Error("Unauthorized access");
        }else{
            //Überprüfen, ob Channel exisitert im Team (Erstellt den Channel mit den gegebenen Werten)
            if(Channels.find({$and: [{"team._id": teamId}, {name: channelName }]}).count() == 0){
                var team = Teams.find({_id: teamId}).fetch();
                var channel = {
                    name: channelName,
                    private: isPrivate,
                    owner: Meteor.userId(),
                    users:[
                        {
                            user: Meteor.userId()
                        }
                    ],
                    team: {
                        _id: teamId,
                        teamName: team[0].name
                    }
                };
                var channelInserted = Channels.insert(channel);
                if(channelInserted){
                    Meteor.call('addUserToChannelRole', Rol.OWNER, teamId, Meteor.userId(), null, channelName);

                }

                //wenn Channel public, werden alle Benutzer im Team zur Userliste des Channels hinzugefügt und es bekommen alle die Rolle Member
                if(!isPrivate){
                    var usersInTeam = Teams.find(teamId, {fields:{
                        users: 1
                    }}).fetch();

                    var users = usersInTeam[0].users;
                    var role = Rol.MEMBER;
                    for(var i = 0; i< users.length; i++){
                        Meteor.call('channel.addUser', channelInserted, users[i].user);
//
//
//  Channels.update({_id: channelInserted}, { $addToSet: {
//                            'users': {
//                                user: users[i].user
//                            }
//                        }});
//                        if(users[i].user !== Meteor.userId()){
//                            Meteor.call('addUserToChannelRole', role, teamId, users[i].user, null, channelName);
//                        }channelId, channelName, userId, teamId, role)
                        Meteor.call('channel.addUserWithRole', channelInserted, users[i].user, teamId, role);
                    }
                }
                return channelInserted;
            }else{
                throw new Meteor.Error("Channel exists");
            }
        }
    },

    'channel.getByName': function(channelName, teamId){
        return Channels.findOne({$and: [{name: channelName}, {"team._id": teamId }]})._id;
    }
});
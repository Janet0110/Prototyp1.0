Meteor.methods({
    /*Methode für das Erstellen eines neuen Channels*/
    'channels.add': function (teamId, channelName, isPrivate, callback) {
        var isPrivate = isPrivate;
        if(!isPrivate){
            isPrivate = false;
        }
        /*Überprüft, ob es sich um ein authorisierter Benutzer handelt*/
        if (!this.userId) {
            throw new Meteor.Error("Unauthorized access");
        }else{
            //Überprüfen, ob Channel im Team exisitert(Erstellt den Channel mit den gegebenen Werten)
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
                /*fügt Channel der Collection Channels hinzu*/
                var channelInserted = Channels.insert(channel);
                /*weist dem Channelerstelle die Rolle Owner hinzu*/
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
                        Meteor.call('channel.addUserWithRole', channelInserted, users[i].user, teamId, role);
                    }
                }
                return channelInserted;
            }else{
                throw new Meteor.Error("Channel exists");
            }
        }
    },

    /*liefert Channel durch Angabe des Channelnamens und der TeamId*/
    'channel.getByName': function(channelName, teamId){
        return Channels.findOne({$and: [{name: channelName}, {"team._id": teamId }]})._id;
    }
});
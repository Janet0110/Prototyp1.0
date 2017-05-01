Meteor.methods({
    'channels.add': function (teamId, channelName, private, callback) {
        var private = private;
        if(!private){
            private = false;
        }
        if (!this.userId) {
            throw new Meteor.Error("Unauthorized access");
        }else{
            if(Channels.find({$and: [{"team._id": teamId}, {name: channelName }]}).count() == 0){
                var team = Teams.find({_id: teamId}).fetch();
                var channel = {
                    name: channelName,
                    private: private,
                    owner: Meteor.userId(),
                    users: {
                        user: Meteor.userId()
                    },
                    team: {
                        _id: teamId,
                        teamName: team[0].name
                    },
                };
                return Channels.insert(channel);
            }else{
                throw new Meteor.Error("Channel exists");
            }
        }
    },

    'channel.getByName': function(channelName, teamId){
        return Channels.findOne({$and: [{name: channelName}, {"team._id": teamId }]})._id;
    }
});
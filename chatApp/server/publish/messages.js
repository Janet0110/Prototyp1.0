/*Liefert Datenbestand Nachrichten im aktuellen Team und Channel*/
Meteor.publish('channelMessages', function (channelName, teamName) {
    if (this.userId) {
        var teamId = Teams.findOne({name: teamName})._id;
        var channelId = Channels.findOne({$and: [{name: channelName}, {"team._id": teamId }]})._id;
        return Messages.find({$and: [{channel: channelId}, {team: teamId }]});
    }
});

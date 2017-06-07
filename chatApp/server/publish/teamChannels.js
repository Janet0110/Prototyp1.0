/*Liefert Datenbestand Channels*/
Meteor.publish('teamChannels', function (teamname) {
    if (this.userId) {
        return Channels.find({"team.teamName": teamname});
    }
});

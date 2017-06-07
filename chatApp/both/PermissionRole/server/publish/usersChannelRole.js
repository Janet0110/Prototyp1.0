/*Liefert Datenbestand von TeamsChannel*/
Meteor.publish("usersChannelRoles", function(teamName) {
    var team = Teams.findOne({name: teamName});
    return TeamsChannel.find({teamId: team._id})
});
Meteor.publish("userRolesInChannel", function(userId, teamName) {
    var teamId = Teams.findOne({name: teamName})._id;
    if(isAdmin(teamId, userId)){
        return TeamsChannel.find({teamId: teamId});
    }
});

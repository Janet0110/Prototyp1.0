Meteor.publish("myTeams", function(userId) {
    var result = Teams.find({"users.user" : userId});
    return result;
});

Meteor.publish("getTeamByName", function(teamname){
    var result = Teams.find({"name": teamname});
    return result;
});
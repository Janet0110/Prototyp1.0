Meteor.publish("myTeams", function(userId) {
    console.log(userId);
    var result = Teams.find({"users.user" : userId});
    return result;
});

Meteor.publish("getTeamByName", function(teamname){
    var result = Teams.find({"name": teamname});
    return result;
});
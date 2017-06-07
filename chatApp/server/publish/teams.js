/*Liefert Datenbestand Teams anhand der UserId*/
Meteor.publish("myTeams", function(userId) {
    var result = Teams.find({"users.user" : userId});
    return result;
});

/*liefert Datenbestand Team durch teamname*/
Meteor.publish("getTeamByName", function(teamname){
    var result = Teams.find({"name": teamname});
    return result;
});
Meteor.methods({
    /*liefert Team durch Angabe des teamnamens*/
    'team.get': function (teamname) {
        var team = Teams.find({"name": teamname}).fetch();
        return team;
    }
});
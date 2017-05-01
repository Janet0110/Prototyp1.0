Meteor.methods({
    'team.get': function (teamname) {
        var team = Teams.find({"name": teamname}).fetch();
        return team;
    }
});
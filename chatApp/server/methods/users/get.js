Meteor.methods({
    /*liefert Benutzer durch Angabe der BenutzerId*/
    'user.get': function (userId) {
        var user = Meteor.users.findOne(userId);
        return user;
    }
});
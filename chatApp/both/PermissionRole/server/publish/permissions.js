/*liefert die Berechtigungen*/
Meteor.publish("permissions", function(userId) {
    var result = Permissions.find({});
    return result;
});


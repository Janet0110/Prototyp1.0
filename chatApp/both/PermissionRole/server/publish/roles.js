/*Liefert die Rollen*/
Meteor.publish("roles", function(userId) {
    var result = Roles.find({});
    return result;
});
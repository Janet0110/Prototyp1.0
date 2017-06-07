/*liefert Datenbanstand Invite*/
Meteor.publish("invite", function(inviteId) {
    var result = Invites.find({_id: inviteId});
    return result;
});
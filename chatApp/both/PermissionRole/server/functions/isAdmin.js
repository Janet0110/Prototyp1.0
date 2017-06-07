/*Überprüfung, ob User Admin im Team ist*/
isAdmin = function(teamId, userId) {
    var admin = Meteor.users.findOne({_id: userId, 'teams': {$elemMatch: {id: teamId, role: {$eq: Rol.ADMIN}}}});
    return admin;
}

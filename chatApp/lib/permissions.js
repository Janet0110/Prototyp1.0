Permissions = new Mongo.Collection("permissions");

/*für Anzeige globaler Berechtigungen*/
getPermissionsGL = function(){
    return Permissions.find({_id: {$in: [Perm.CREATE_CHANNEL, Perm.INVITE_USER]}}).fetch()
};

/*für Anzeige Channel-Berechtigungen*/
getPermissionsCh = function(){
    return Permissions.find({_id: {$nin: [Perm.CREATE_CHANNEL, Perm.INVITE_USER]}}).fetch()
};
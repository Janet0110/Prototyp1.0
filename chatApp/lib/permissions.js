Permissions = new Mongo.Collection("permissions");

getPermissionsGL = function(){
    return Permissions.find({_id: {$in: [Perm.CREATE_CHANNEL, Perm.INVITE_USER]}}).fetch()
};

getPermissionsCh = function(){
    return Permissions.find({_id: {$nin: [Perm.CREATE_CHANNEL, Perm.INVITE_USER]}}).fetch()
};
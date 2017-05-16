hasPermission = function(role, permission){
    return Permissions.findOne({_id: permission, roles:role});
};
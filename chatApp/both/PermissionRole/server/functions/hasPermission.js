/*Funktion für die Überprüfung, ob Rolle die Berechtigung hat*/
hasPermission = function(role, permission){
    return Permissions.findOne({_id: permission, roles:role});
};
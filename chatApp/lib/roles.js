Roles = new Mongo.Collection("roles");

/*Für Anzeige globaler Rollen*/
getRolesGL = function(){
    return Roles.find({_id: {$in: [Rol.USER]}}).fetch()
};

/*Für Anzeigen channel Rollen*/
getRolesCh = function(){
    return Roles.find({_id: {$nin: [ Rol.ADMIN, Rol.USER]}}).fetch()
};
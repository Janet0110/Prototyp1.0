Roles = new Mongo.Collection("roles");

getRolesGL = function(){
    return Roles.find({_id: {$in: [Rol.USER]}}).fetch()
};

getRolesCh = function(){
    return Roles.find({_id: {$nin: [ Rol.ADMIN, Rol.USER]}}).fetch()
};
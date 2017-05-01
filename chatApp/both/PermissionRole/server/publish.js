Meteor.publish('role', function (roleId){
   return Roles.find(roleId);
});

Meteor.publish('roles', function (filters, options) {
    return Roles.find(filters, options);
});

Meteor.publish('userRole', function(){
    if(!Meteor.userId){

    }

    var roleId = Roles.getUserRoleId(Meteor.userId);
    if (roleId) {
        return [
            Roles.find({_id: roleId}),
            Meteor.users.find({_id: this.userId}, {fields: {roleId: 1}})
        ];
    } else {
        return this.ready();
    }
});
Meteor.methods({
    /*Erstellt ein neues Team*/
    'team.add': function(opts, callback) {
        check(opts.name, String);
        /*Überprüft, ob es sich um ein authorisierter Benutzer handelt*/
        if (!Meteor.userId()) {
            throw new Meteor.Error("Unauthorized access");
        }
        /*Überprüft, ob Teamname mehr als 4 Zeichen hat*/
        if(opts.name.length < 4) {
            throw new Meteor.Error("Teamname must be at least 4 characters");
        }
        /*Überprüft, ob das Team bereits schon existiert*/
        if (Teams.find({name: opts.name}).count() > 0) {
            throw new Meteor.Error("Team already exists");
        }else{
            var teamId = Teams.insert(opts);
            var role = Roles.findOne({_id: 'admin'}, {fields:{_id: 1}});
            /*weist Rolle Admin dem Teamersteller zu*/
            Meteor.call('addUserToRole', Rol.ADMIN, teamId, Meteor.userId, function(err){
                console.log(err);
            });
            return teamId;
        }
    },
    /*liefert das Team mit der Übergabe der TeamId*/
    'team.getById': function(teamId){
        return Teams.findOne({_id: teamId});
    }
});
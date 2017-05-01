Meteor.methods({
    'team.add': function(opts, callback) {
        check(opts.name, String);

        if (!Meteor.userId()) {
            throw new Meteor.Error("Unauthorized access");
        }

        if(opts.name.length < 4) {
            throw new Meteor.Error("Teamname must be at least 4 characters");
        }
        if (Teams.find({name: opts.name}).count() > 0) {
            throw new Meteor.Error("Team already exists");
        }else{
            return Teams.insert(opts);
        }
    },

    'team.getById': function(teamId){
        return Teams.findOne({_id: teamId});
    }
});
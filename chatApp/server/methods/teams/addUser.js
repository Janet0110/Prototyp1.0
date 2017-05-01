Meteor.methods({
    'team.addUser': function(opts, callback) {
        if (Teams.find({"users._id": opts.userId}).count() > 0) {
            throw new Meteor.Error("User already in team");
        }else{
            return Teams.update({_id: opts.teamId}, { $addToSet: {
                'users': {
                    user: opts.userId
                }
            }});
        }
    }
});
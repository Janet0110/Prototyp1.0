Meteor.methods({
    'user.get': function (userId) {
        var user = Meteor.users.findOne(userId);
        return user;
    }
});
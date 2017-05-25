Meteor.methods({
    deleteMessage: function(messageId, userId) {
        if (!this.userId) {
            throw new Meteor.Error("Unauthorized access");
        }

        if(Messages.find(messageId).count()==0) {
            throw new Meteor.Error(404, 'Message does not exist');
        }

        Messages.remove(messageId, function(err){
            if(err){
                throw new Meteor.Error(err.message);
            }
        });

    }
});
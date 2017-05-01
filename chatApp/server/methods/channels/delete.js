Meteor.methods({
    delete: function(channelId, userId) {
        if (!this.userId) {
            throw new Meteor.Error("Unauthorized access");
        }

        if(Channels.find(channelId).count()==0) {
            throw new Meteor.Error(404, 'Channel does not exist');
        }

        Channels.remove(channelId, function(err){
            if(err){
                throw new Meteor.Error(err.message);
            }else{
                Messages.remove({channel: channelId });
            }
        });

    }
});
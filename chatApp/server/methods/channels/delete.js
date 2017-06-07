Meteor.methods({
    /*löscht einen Channel*/
    delete: function(channelId, userId) {
        /*Überprüft, ob es sich um ein authorisierter Benutzer handelt*/
        if (!this.userId) {
            throw new Meteor.Error("Unauthorized access");
        }
        /*überprüft ob, Channel existiert*/
        if(Channels.find(channelId).count()==0) {
            throw new Meteor.Error(404, 'Channel does not exist');
        }
        /*löscht Channel + Nachrichten*/
        Channels.remove(channelId, function(err){
            if(err){
                throw new Meteor.Error(err.message);
            }else{
                Messages.remove({channel: channelId });
            }
        });

    }
});
Meteor.methods({
    /*Löscht Nachrichten*/
    deleteMessage: function(messageId, userId) {
        /*Überprüft, ob es sich um ein authorisierter Benutzer handelt*/
        if (!this.userId) {
            throw new Meteor.Error("Unauthorized access");
        }
        /*Überprüft, ob Nachrichten existieren*/
        if(Messages.find(messageId).count()==0) {
            throw new Meteor.Error(404, 'Message does not exist');
        }
        /*Löscht Nachrichten*/
        Messages.remove(messageId, function(err){
            if(err){
                throw new Meteor.Error(err.message);
            }
        });

    }
});
Messages = new Meteor.Collection('messages');

/*Befugnis für das Erstellen eines Nachricht-Eintrags*/
Messages.allow({
    insert:function(userId, doc){
        if(userId &&  doc.user === userId){
            return true;
        }
    }
});


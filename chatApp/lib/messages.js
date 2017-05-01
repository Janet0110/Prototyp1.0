Messages = new Meteor.Collection('messages');

Messages.allow({
    insert:function(userId, doc){
        if(userId &&  doc.user === userId){
            return true;
        }
    }
});


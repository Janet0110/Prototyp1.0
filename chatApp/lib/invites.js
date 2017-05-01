Invites = new Meteor.Collection( 'invites' );

Invites.allow({
    insert: function(){
        return false;
    },
    update: function(){
        return false;
    },
    remove: function(){
        return false;
    },
});

Invites.deny({
    insert: function(){
        return true;
    },
    update: function(){
        return true;
    },
    remove:  function(){
        return true;
    }
});

Teams = new Mongo.Collection('teams');

Teams.allow({
    insert:function(userId, doc){
        if(userId &&  doc.owner === userId){
            return true;
        }
    }
});

currentTeam = function(){
    var team = null;
    if(Meteor.userId()){
        team = Teams.findOne({ name: Session.get("team")});
    }
    return team;
};

currentTeamId = function(){
    var team = currentTeam();
    return team? team._id : null;
};

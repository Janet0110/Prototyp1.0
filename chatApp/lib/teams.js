Teams = new Mongo.Collection('teams');

/*Befugnis für das Erstellen eines Teams*/
Teams.allow({
    insert:function(userId, doc){
        if(userId &&  doc.owner === userId){
            return true;
        }
    }
});

/*liefert aktuelles Team*/
currentTeam = function(){
    var team = null;
    if(Meteor.userId()){
        team = Teams.findOne({ name: Session.get("team")});
    }
    return team;
};

/*liefert aktuelle TeamId*/
currentTeamId = function(){
    var team = currentTeam();
    return team? team._id : null;
};

Meteor.methods({
    /*Methode für das Einladen eines Benutzers in das Team*/
    'team.invite': function (userId, team, to, from, subject, text) {
        /*Überprüft, ob es sich um ein authorisierter Benutzer handelt*/
        if(!userId){
            throw new Meteor.Error(401, 'Unauthorized access');
        }
        /*für weiteres Ausführen anderer Methoden*/
        this.unblock();

        /*validiert Email*/
        if(validateEmail(to)){
            /*erstellt ein Invite-Document*/
            var inviteId = Invites.insert({
               email: to,
                invited: false,
                invitedFrom: {
                    userId:  userId,
                    username: Meteor.user().username
                },
                inviteFor: {
                    teamId: team._id,
                    teamName: team.name

                },
                requested: (new Date()).toISOString(),
                accountCreated: false,
            });
            /*sendet eine Email - Konfigurationsdatei muss angepasst werden (Serverangaben werden benötigt -> Mail-url.js*/
            Email.send({
                to: to,
                from: from,
                subject: subject,
                text: text + ": " + (JSON.stringify(process.env.ROOT_URL + "/invite/" + inviteId))
            });
        }else{
            throw new Meteor.Error("Error, Email isn't correct");
        }
    },
    /*Methode für das Akzeptieren einer Einladung*/
    'acceptInvite': function(currentInvite, callback){
        try {
            /*Überprüft, ob eine Einladung gesendet wurde*/
            var invite = Invites.find(currentInvite[0]._id).fetch()[0];
            if (!invite) {
                throw new Meteor.Error("Invite not found!");
            }
            /*holt sich die TeamId, für das die Einladung hervorgesehen ist*/
            var teamId = Invites.findOne({_id: invite._id}, {fields: {"inviteFor.teamId": 1}}).inviteFor.teamId;
            //Sucht den Benutzer, der eingeladen werden soll
            var user = Meteor.users.find({"emails.address": invite.email}).fetch()[0];
            //wenn Benutzer bereits registriert ist, wird der Benutzer zum Team hinzugefügt
            if (user) {
                Invites.update({_id: invite._id}, {$set: {accountCreated: true}});
                if (Teams.findOne({_id: teamId, "users.user": user._id})) {
                    throw new Meteor.Error("User is already in team");
                } else {
                    var opts = {
                        userId: user._id,
                        username: user.username,
                        teamId: teamId,
                    };
                    var updated;

                    //Update Invite
                    Meteor.call("team.addUser", opts, function () {

                        updated = Invites.update({_id: invite._id}, {$set: {invited: true}});
                    });
                    return 1;
                }
            }
        }catch(e){
            throw new Meteor.Error("Invite doesnt exist");
        }

    }
});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
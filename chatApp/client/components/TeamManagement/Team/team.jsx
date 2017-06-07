TeamCreate = React.createClass({
    /*Initialisierung von ReactMeteorData, um in der Komponente Meteors-Methoden anwenden zu können*/
    mixins: [ReactMeteorData],
    /*holt sich userId und usernamen*/
    getMeteorData(){
        return{
            userId: User.id(),
            username: User.get().username
        }
    },

    /*Form-Submit für die Erstellung eines neuen Teams*/
    onSubmit(e){
        e.preventDefault();
        var formData = e.target;
        var teamname = formData.teamName.value;
        var user = this.getMeteorData();

        var optsTeam = {
            name: teamname,
            owner: user.userId,
            users:[
                {
                    user: user.userId
                }
            ]


        };
        /*Aufruf Meteors Methode, um ein Team hinzuzufügen*/
        Meteor.call("team.add", optsTeam, function(err, result){
            if(!err){
                Meteor.call("channels.add", result, 'general', function(err){
                    if(!err){
                        Materialize.toast("Channel created", 4000, "success");
                    }else{
                        Materialize.toast(err.message, 4000, "error");
                    }
                });
                FlowRouter.go('/teams');
                Materialize.toast("Team created", 4000, "success");
            }else{
                Materialize.toast(err.message, 4000, "error");
            }
        });
    },

    /*rendert Darstellung*/
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3" >
                        <div className="panel panel-login" >
                            <div className="form-header">
                                <div className="col-xs-6">
                                   Create a Team
                                </div>
                            </div>

                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-lg-12 col">
                                        <form onSubmit={this.onSubmit}>
                                            <div className="form-group">
                                                <input id="teamId" type="text" name="teamName" className="username" placeholder="Teamname"></input>
                                            </div>

                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-sm-6 col-sm-offset-3">
                                                        <button name="submit" id="submit"
                                                                 className="form-control btn btn-register">Create Team</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <a className="link-register-login" id="loginLink" href="/teams">back to my teams</a>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
Invite = React.createClass({
    /*Initialisierung von ReactMeteorData, um in der Komponente Meteors-Methoden anwenden zu können*/
    mixins: [ReactMeteorData],
    /*registriert sich an Invite-Publish-Methode, um die Einladung anzunehmen*/
    getMeteorData(){
        var handle = Meteor.subscribe("invite", this.props.inviteId);
        var invite = [];
        if(handle.ready()){
            invite = Invites.find({_id: this.props.inviteId}).fetch();
        }
        return {
            invite : invite
        };
    },
    /*Zustand ob Benutzer, der eingeladen wurde, bereits regisitriert ist*/
    getInitialState(){
        return {
            register: false
        }
    },
    /*Einladung akzeptieren */
    onSubmit: function(e){
        e.preventDefault();
        var self = this;
        /*Aufruf Methode acceptInvite, um Einladung zu akzeptieren*/
        Meteor.call("acceptInvite", this.data.invite, function(err, result){
            if(err){
                console.log(err);
                Materialize.toast(err.message, 4000, "error");
            }else{
                if(self.data.invite[0].accountCreated){
                    FlowRouter.go('/login');
                    Materialize.toast("Invite accepted", 4000, "success");
                }else{
                    self.setRegisterState();
                    Materialize.toast("You must first register", 4000, "success");
                    Session.set("invite", result);
                }
            }
        });
    },

    setRegisterState: function(){
        this.setState({
            register: true
        })
    },

    /*rendert die Darstellung*/
    render: function(){
        var teamName ="";
        var userName ="";
        this.data.invite.map((doc) => {
            teamName = doc.inviteFor.teamName;
            userName = doc.invitedFrom.username;
        });

        {this.state.register ? <Register/> : null}
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3" >
                        <div className="panel panel-login" >
                            <div className="form-header">
                                <div className="col-xs-6">
                                    Invite for Team {teamName}
                                </div>
                            </div>

                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-lg-12 col">
                                        <form onSubmit={this.onSubmit}>
                                            <span>Do you want to accept the invitation from {userName}?</span>
                                            <br/>
                                            <br/>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-sm-6 col-sm-offset-3">
                                                        {/*<button name="submit" id="submit"*/}
                                                                {/*className="form-control btn btn-register">Reject</button>*/}
                                                        <button name="submit" id="submit"
                                                                className="form-control btn btn-register">Accept</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});
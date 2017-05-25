TeamSidebar = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){
        return {
            users: Teams.find({}, {fields: {"users": 1}}).fetch()[0].users
        };
    },
    getInitialState(){
        return {
            inputValue: "",
            isAdmin: false
        }
    },
    componentWillMount(){
        var self = this;
      Meteor.call("isAdmin", currentTeamId(), Meteor.userId(), function(err, result) {
          if(!err){
              self.setState({
                  isAdmin: true
              })
          }else{
              self.setState({
                  isAdmin: false
              })
          }
      })
    },

    render:function(){
        var buttonName = {
            name: "Invite",
            onClick: this.inviteUser
        };


        return(
            <div className="teamSidebar">
                <div className="teamSidebar_header">
                             <span className="teamSidebar_header_text">
                                 Users in team:
                             </span>
                                <DialogModal
                                    buttonType={<div className="add_user"></div>}
                                    header="Invite a new user to your team"
                                    content={this.renderForm()}
                                    buttonName = {buttonName}
                                />
                </div>
                <ul>

                    {this.renderUserList()}
                </ul>
                {console.log(this.state.isAdmin)}
                <div>
                    <a className="permission" href='' onClick={this.state.isAdmin ? this.permissionsLink.bind(this) : this.showErrorMessage.bind(this)}>Permissions</a><br></br>
                    <a className="userRoles" href='' onClick={this.state.isAdmin ? this.rolesLink.bind(this) : this.showErrorMessage.bind(this)}>User roles</a>
                </div>
            </div>
            )
    },
    showErrorMessage: function(){
        Materialize.toast("not authorized", 4000, "error");
    },
    inviteUser: function() {
        var team = currentTeam();
        var to = this.state.inputValue;
        var from = "JanetRahn@msn.com";
        var subject = "Invite for ChatApp in Team " + currentTeam().name;
        var text = "test ";
        Meteor.call("team.invite", Meteor.userId(), team, to, from, subject, text, function(err) {
            if (!err) {
                Materialize.toast("Sent invitation", 4000, "success");
            } else {
                Materialize.toast(err.message, 4000, "error");
            }
        });
    },
    permissionsLink: function(){
         FlowRouter.go('permissions', { team: Session.get('team') });
    },
    rolesLink: function(){
        FlowRouter.go('roles', { team: Session.get('team') });
    },

    updateInputValue: function(evt){
        this.setState({
            inputValue: evt.target.value
        });
    },


    renderForm: function(){
        return(
            <div>
                <input type="text" value={this.state.inputValue} onChange={this.updateInputValue} placeholder="Email from user for invite"></input>
                <div className= "channel-private">
                    <p>
                        <input type="checkbox"/>
                        <label for="test5">Private</label>
                    </p>

                </div>
            </div>
        );
    },

    renderUserList: function(){
        var users = [];
        this.data.users.map((doc) => {
            var user = Meteor.users.find(doc.user).fetch()[0];
            users.push(
               <li className="user_element">
                   <a className="user_name" href={"private/" + doc.user}>
                       <span>{user.username}</span>
                   </a>
               </li>
            )
        });
        return users;
    }
});


ChannelTool = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){
        return{
            usersInTeam: Teams.find(currentTeamId()).fetch(),
        }
    },
    getInitialState: function(){
        return{
            deletePopUp: false,
            addUserPopUp: false,
            selectValue: "",
        }
    },
    render(){
       var channelSettingName = "Settings";
       var buttonName = {
           name: "Delete",
           onClick: this.deleteChannel,
           close: this.closeDialog
       };
       var deleteDialog = null;
        if(this.state.deletePopUp){
                deleteDialog = <DialogModalPopUp header="Channel delete" content="Do you really delete channel?"  buttonName = {buttonName} />
        }else{
            deleteDialog = null;
        }

        var buttonNameAddUser = {
            name: "Add user",
            onClick: this.addUser,
            close: this.closeDialog
        };
        var addUserDialog = null;
        var headerText = "Add user to channel";

        console.log(currentChannel());
        if(this.state.addUserPopUp){
            addUserDialog = <DialogModalPopUp header={headerText}  content={this.addUserContent()}  buttonName = {buttonNameAddUser} />
        }else{
            addUserDialog = null;
        }

       return(
            <div>
                <ul id="nav-mobile" className="right hide-on-med-and-down ulList" >
                    <DropdownMenuParent name={channelSettingName}>
                            <DropDownMenuChild onClick={this.warningPopUp} nameButton="Remove channel"/>
                            <DropDownMenuChild onClick={this.addUserDialog} nameButton="Add user to channel"/>
                            <DropDownMenuChild onClick={this.toast} nameButton="Toast"/>
                    </DropdownMenuParent>
                </ul>
                {deleteDialog}
                {addUserDialog}
            </div>
       )
   },
    toast: function(){
      Materialize.toast("test success", 4000, "success");
    },
    addUserContent: function(){
        var content =[];
        console.log(currentChannel())
        var users = this.data.usersInTeam[0].users;
        var options = [];
        for(var i = 0 ; i< users.length; i++){
            var user = Meteor.users.find(users[i].user).fetch()[0];
           options.push(
               <option value = {user._id}>{user.username}</option>
           )
        }
        console.log(options)
        content.push(
            <div className="input-field col s12">
                <select value={this.state.selectValue} onChange={this.updateSelectValue}>
                    <option value="" disabled selected> Choose a user</option>
                    {options}
                </select>
            </div>
        );

        return content;


    },
    updateSelectValue: function(evt){
        console.log(evt.target.value);
        this.setState({
            selectValue: evt.target.value
        });
    },
    addUser: function(){
        Meteor.call("channel.addUserWithRole", currentChannelId(), this.state.selectValue, currentTeamId(), Rol.MEMBER);
    },
    warningPopUp: function(){
        this.setState({
            deletePopUp: !this.state.deletePopUp
        });
//        var self = this;
//        Meteor.call('hasChannelPermission', Perm.DELETE_CHANNEL, currentTeamId(), User.id(), currentChannelId(), function(err, hasPermission){
//            if(hasPermission){
//                self.setState({
//                    deletePopUp: !this.state.deletePopUp
//                });
//            }else{
//                Materialize.toast('Not allowed', 4000, "error");
//            }
//        });

    },
    addUserDialog: function(){
        this.setState({
            addUserPopUp: !this.state.addUserPopUp,
        });
    },
    closeDialog: function(){
        this.setState({
            deletePopUp: false,
            addUserPopUp: false
        });
    },

    deleteChannel: function(){
    var channelId = currentChannelId();
        Meteor.call('delete', channelId, Meteor.userId(),function(err){
            if(err){
                Materialize.toast(err, 4000, "error");
            }else{
                Materialize.toast("Channel deleted", 4000, "success");
                FlowRouter.go(history.back());
                this.setState({
                    deletePopUp: !this.state.deletePopUp
                });
            }
        })
    },
    renderForm: function(){
      return (
          <span>"jfhdj"</span>
      )
    },

    buttonType: function(){
        var self = this;
        var channelSettingName = "Settings";
        return (
            <ul id="nav-mobile" className="right hide-on-med-and-down ulList" >
                <Dropdown name={channelSettingName} list={channelSettingList} selected={channelSettingList[0]}/>
            </ul>
        )
    }
});

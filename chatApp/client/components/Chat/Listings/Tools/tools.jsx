ChannelTool = React.createClass({
    /*Initialisierung von ReactMeteorData, um in der Komponente Meteors-Methoden anwenden zu können*/
    mixins: [ReactMeteorData],
    /*holt sich die Daten des aktuellen Teams von Meteor*/
    getMeteorData(){
        return{
            usersInTeam: Teams.find(currentTeamId()).fetch(),
        }
    },
    /*Initialisiert den Zustand für das PopUp-Fenster um einen Channel zu löschen und einen Benutzer dem Channel hinzuzufügen. Desweiteren wird der Zustand
    * selectValue gesetzt für die Eingabe eines Benutzers, das in den Channel eingeladen werden soll*/
    getInitialState: function(){
        return{
            deletePopUp: false,
            addUserPopUp: false,
            selectValue: "",
        }
    },
    /*rendert die Darstellung*/
    render(){
        /*initialisiert das Dropdown-Menü mit dem Anzeigenamen Settings und seinen Menü-Unterpunkten*/
       var channelSettingName = "Settings";
       var buttonName = {
           name: "Delete",
           onClick: this.deleteChannel,
           close: this.closeDialog
       };
       var deleteDialog = null;
       /*Überprüft ob das Dialogfenster für das Löschen eines Channels angezeigt werden soll*/
        if(this.state.deletePopUp){
                deleteDialog = <DialogModalPopUp header="Channel delete" content="Do you really delete channel?"  buttonName = {buttonName} />
        }else{
            deleteDialog = null;
        }
        /*neuer Menü-Unterpunkt*/
        var buttonNameAddUser = {
            name: "Add user",
            onClick: this.addUser,
            close: this.closeDialog
        };
        var addUserDialog = null;
        var headerText = "Add user to channel";

        /*Überprüft, ob das Dialogfenster anzeigen soll, um einen Benutzer in den Channel einzuladen*/
        if(this.state.addUserPopUp){
            addUserDialog = <DialogModalPopUp header={headerText}  content={this.addUserContent()}  buttonName = {buttonNameAddUser} />
        }else{
            addUserDialog = null;
        }

        /*rendert die Darstellung*/
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
    /*erzeugt eine Toastmeldung*/
    toast: function(){
      Materialize.toast("test success", 4000, "success");
    },
    /*iteriert das Objekt mit den vorhanden Benutzern im Team, um einen Benutzer auswählen zu können, damit dieser eingeladen werden kann*/
    addUserContent: function(){
        var content =[];
        var users = this.data.usersInTeam[0].users;
        var options = [];
        for(var i = 0 ; i< users.length; i++){
            var user = Meteor.users.find(users[i].user).fetch()[0];
           options.push(
               <option value = {user._id}>{user.username}</option>
           )
        }
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
    /*Aktualisiert das Eingabefeld, in dem ein Benutzer eingegeben wird, den man in den Channel einladen möchte*/
    updateSelectValue: function(evt){
        this.setState({
            selectValue: evt.target.value
        });
    },
    /*ruft Meteors Methode auf, um einen Benutzer in die Channelrolle einzuteilen*/
    addUser: function(){
        Meteor.call("channel.addUserWithRole", currentChannelId(), this.state.selectValue, currentTeamId(), Rol.MEMBER);
    },
    /*öffnet das Dialogfenster, um einen Channel zu löschen*/
    warningPopUp: function(){
        this.setState({
            deletePopUp: !this.state.deletePopUp
        });

    },
    /*öffnet das Dialogfenster, um einen Benutzer in den Channel einzuladen*/
    addUserDialog: function(){
        this.setState({
            addUserPopUp: !this.state.addUserPopUp,
        });
    },
    /*schließt alle Dialogfenster*/
    closeDialog: function(){
        this.setState({
            deletePopUp: false,
            addUserPopUp: false
        });
    },

    /*ruft Meteors Methode auf, um den Channel zu löschen*/
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
    /*rendert die Darstellung*/
    renderForm: function(){
      return (
          <span>"jfhdj"</span>
      )
    },

    /*rendert den Button für das Dropdown-Menü und übergibt die erstellten Menü-Unterpunkte*/
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

Footer = React.createClass({
    /*Initialisierung von ReactMeteorData, um in der Komponente Meteors-Methoden anwenden zu können*/
    mixins: [ReactMeteorData],
    getMeteorData(){
        /*liefert den Namen für das Absender der Textnachricht. Name wird zusammen mit Text etc. in die Collection Messages gespeichert*/
        return{
            username: User.get().username,
        }
    },

    /*Zustand für das Eingabefeld und den Benutzernamen*/
   getInitialState: function(){
        return{
            inputValue:"",
            user: User.get().username
        }
    },
    /*sendet und speichert Textnachricht in ein Team und Channel*/
   sendMessage: function(e){
       var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
       if (charCode == 13 || e.type =="click") {
           Messages.insert({
               // TODO: Meteor.call Method
               channel: currentChannelId(),
               text: this.state.inputValue,
               user: User.id(),
               team: currentTeamId(),
               date: Date.now()
           });
           /*setzt den Zustand des Eingabefeld */
           this.setState({
               inputValue:""
           })
       }
   },
    /*Aktualisiert den Zustand des Wertes, das in das Eingabefeld getippt wurde*/
    updateInputValue: function(evt) {
        this.setState({
            inputValue: evt.target.value
        });
    },
    /*rendert Darstellung*/
   render(){
       return(
           <div className="footer">
               <div className="user-menu">
                   <span className="user-menu_profile-pic"></span>
                   <span className="user-menu_username">{this.data.username}</span>
                   <img className="connection_icon" src="data:image/png;base64,iVBORw0KGgoAAAAN..."></img>
                       <span className="connection_status"> online</span>
               </div>
               <div className="input">
                   <input type="text" className="inputText" name="messageInput"  value={this.state.inputValue}  onChange={this.updateInputValue} onKeyPress={this.sendMessage}></input>
                   <button className="form-control btn btn-login sendButton" onClick={this.sendMessage}>Send</button>
               </div>
           </div>
       )
   }
});
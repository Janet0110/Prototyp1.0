MessageContainer = React.createClass({
    /*Initialisierung von ReactMeteorData, um in der Komponente Meteors-Methoden anwenden zu können*/
    mixins: [ReactMeteorData],
    /*Holt sich die Nachrichten, die in dem Channel geschrieben wurden.*/
    getMeteorData(){
      return{
          msgs : Messages.find({"channel": currentChannelId()}).fetch()
      }
    },

    /*Zustand für die Anzeige der aktuellen Zeit*/
    getInitialState: function(){
        return{
            time:""
        }
    },

    /*Formartiert Zeitangabe an Nachricht*/
    formatTime: function(date){
        var date = new Date(date);
        var day = date.getDay();
        var month = date.getMonth();
        var year = date.getYear();
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        return month + '/' + day + "/" + year + " " + hours + ':' + minutes.substr(minutes.length-2) + ':' + seconds.substr(seconds.length-2);
    },

    /*rendert Nachricht*/
    render(){
       return(
           <div className="messages_container">
               <ul>
               {this.renderMessages()}
               </ul>
           </div>
       )
   },

    /*iteriert Nachrichten-Objekt für die einzelne Darstellung einer Nachricht*/
    renderMessages: function(){
        var messages = [];
        this.data.msgs.map((message) => {
            var user = Meteor.users.find(message.user).fetch()[0];
            messages.push (
                    <li>
                        <a href="" className="message_profile-pic"></a>
                        <a href="" className="message_username">{user.username}</a>
                        <span className="message_timestamp">{this.formatTime(message.date)}</span>
                        <DeleteMessageTool messageId={message._id}/>
                        <span className="message_content"> {message.text}</span>
                    </li>
            )
        });
        return messages;
    }

});
MessageContainer = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){
      return{
          msgs : Messages.find({"channel": currentChannelId()}).fetch()
      }
    },

    getInitialState: function(){
        return{
            time:""
        }
    },

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

    render(){
       return(
           <div className="messages_container">
               <ul>
               {this.renderMessages()}
               </ul>
           </div>
       )
   },

    renderMessages: function(){
        var messages = [];
        this.data.msgs.map((message) => {
            var user = Meteor.users.find(message.user).fetch()[0];
            console.log(message);
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
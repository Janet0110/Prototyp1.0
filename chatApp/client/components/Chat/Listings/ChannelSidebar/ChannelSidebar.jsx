ChannelSidebar = React.createClass({
    /*Initialisierung von ReactMeteorData, um in der Komponente Meteors-Methoden anwenden zu können*/
    mixins: [ReactMeteorData],
    /*Überprüft, ob ChannelSidebar dem Benutzer angezeigt werden soll. Holt sich die Benutzer, die sich im Channel befinden für die Anzeige */
    getMeteorData(){
        return{
            channelSidebarActiv: Session.get("channelSidebar"),
            usersInChannel: Channels.find(currentChannelId, {fields: {_id: 1, 'users.user':1, owner: 1}}).fetch()
        }
    },
    /*Initialisiert den Zustand channelSidebarActiv durch die Session*/
    getInitialState: function(){
        return{
            channelSidebarActiv: Session.get("channelSidebar")
        }
    },
    /*rendert die Darstellung*/
    render(){
        var sidebar = null;
        if(this.data.channelSidebarActiv){
            sidebar =  <div className="channelSidebar">
                <div className="channelText">Channel</div>
                <h5 className="channelName"> </h5>
                <div className="channelBox">
                    <span className="channel-users-text">Users in Channel: </span>
                    <div className="usersList">
                        <ul>
                            {this.renderUsers()}
                        </ul>
                    </div>
                </div>
            </div>
        }else{
            sidebar = "";
        }
        return(
            <div>
                 {sidebar}
            </div>
        )
    },
    /*itieriert das von Meteor gelieferte Objekt, um die Benutzer im Channel anzuzeigen*/
    renderUsers: function(){
        var users = [];
        var channel = this.data.usersInChannel;
        console.log(channel);
        for(var i = 0; i < channel.length; i++){
            if(channel[i]._id === currentChannelId()){
                var usersList = channel[i].users;
                for(var j = 0; j < usersList.length; j++){
                    console.log(usersList[j].user);
                    var user = Meteor.users.find(usersList[j].user).fetch()[0];
                    if(user){
                        if(channel[i].owner === usersList[j].user){
                            users.push (
                                <li>
                                    {user.username} <b> (Owner)</b>
                                </li>
                            )
                        }else{
                            users.push (
                                <li>
                                    {user.username}
                                </li>
                            )
                        }
                    }

                }
            }
        }
        return users;
    }
});
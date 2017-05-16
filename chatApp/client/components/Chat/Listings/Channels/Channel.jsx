canJoinChannel = function(channelName){
    var teamId = currentTeamId();
    var channelId = getChannelId(channelName, currentTeamId());
        Meteor.call('hasChannelPermission', Perm.JOIN_PRIVATE_CHANNEL,  currentTeamId(),  User.id(), channelId, function(err, canJoin) {
        if (!err) {
            this.state = {
                channel: channelName
            };
            Session.set(channelName, true);
            return true;
        } else {
            Session.set(channelName, false);
            return false;
        }
    });
};

Channel = React.createClass({
    getInitialState: function(){
        return{
            private: this.props.doc.private,
            channel: ""
        }
    },
    canJoin: function(channelName){
        if(Session.get(channelName)){
            return channelName;
        }else{
            return "";
        }
    },
    giveFeedback: function(channel){

        if(!Session.get(channel)){
            Materialize.toast("not authorized", 4000, "error");
        }
    },
    render(){
        //Überprüfung aller Channels, ob betretbar oder nicht //erneutes Rendern erforderlich
        canJoinChannel(this.props.doc.name);
        return(
            <li className="channel" >
                <a className="channel_name" href={"" + this.canJoin(this.props.doc.name)} onClick = {this.giveFeedback.bind(this, this.props.doc.name)}>
                    <span>{this.props.doc.name}</span>
                </a>
                <div className={"channel " + (this.props.doc.private ? "private" : "")}></div>
            </li>
        )
    }
});
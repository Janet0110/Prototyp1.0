canJoinChannel = function(channelName){
    /*Überprüft ob der Benutzer mit der aktuellen Rolle den Channel betreten kann und setzt gegebenfalls den Zustand,
    damit der Benutzer den Channel nicht betreten kann*/
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
    /*Initialisierung von ReactMeteorData, um in der Komponente Meteors-Methoden anwenden zu können*/
    mixins: [ReactMeteorData],
    getMeteorData(){
        return{
            channelJoin: Session.get(this.props.doc.name)
        }
    },
    /*Initialisiert den Zustand mit private udn channel*/
    getInitialState: function(){
        return{
            private: this.props.doc.private,
            channel: ""
        }
    },
    /*überprüft ob der Channel betreten werden darf*/
    canJoin: function(channelName){
        if(this.data.channelJoin){
            return channelName
        }else{
            return ""
        }
    },
    /*erstellt ein Toast*/
    giveFeedback: function(channel){
        if(!Session.get(channel)){
            Materialize.toast("not authorized", 4000, "error");
        }
    },
    /*rendert die Darstellung*/
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
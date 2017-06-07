DeleteMessageTool = React.createClass({
    /*rendert Darstellung*/
    render(){
        return(
            <span className="message_delete_Icon" onClick={this.deleteMessage.bind(this)}></span>
        )
    },
    /*Ruft Meteors Methode auf, um Nachricht zu löschen*/
    deleteMessage: function(){
        Meteor.call('deleteMessage', this.props.messageId, Meteor.userId());
    }
});
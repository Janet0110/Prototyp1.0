DeleteMessageTool = React.createClass({
    render(){
        return(
            <span className="message_delete_Icon" onClick={this.deleteMessage.bind(this)}></span>
        )
    },
    deleteMessage: function(){
        Meteor.call('deleteMessage', this.props.messageId, Meteor.userId());
    }
});
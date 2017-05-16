ChannelInfo = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){
        return{
           // msgs : Messages.find({"channel": currentChannelId()}).fetch()
        }
    },
    componentDidMount() {
        Session.set("channelSidebar", false)
    },
    openSidebar: function(){
        Session.set("channelSidebar", !Session.get("channelSidebar"));
    },

    render(){
        return(
            <div className="fixed-action-btn horizontal click-to-toggle channelInfoBtn" onClick={this.openSidebar.bind(this)}>
                <a className="btn-floating channelInfoFloating btn-large grey">
                    <i className="material-icons"></i>
                </a>
            </div>
        )
    }

});
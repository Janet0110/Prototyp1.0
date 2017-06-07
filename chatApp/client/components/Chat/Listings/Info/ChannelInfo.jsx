ChannelInfo = React.createClass({

    /*Bevor Komponente erstellt wird, wird die ChannelSidebar durch das Setzen der Session channelSidebar versteckt*/
    componentDidMount() {
        Session.set("channelSidebar", false)
    },
    /*öffnet die ChannelSidebar durch das Setzen der Session*/
    openSidebar: function(){
        Session.set("channelSidebar", !Session.get("channelSidebar"));
    },
    /*rendert die Darstellung*/
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
TeamTool = React.createClass({

    getInitialState: function() {
        return {
            teamSidebar: false
        };
    },
    componentWillMount(){
        Session.set("TeamSidebar", false);
    },

    showTeamSidebar: function(){
        this.setState({
            teamSidebar: !this.state.teamSidebar
        });
        Session.set("TeamSidebar", !this.state.teamSidebar);
    },
    render:function(){
            return(
                <div className="fixed-action-btn horizontal click-to-toggle" onClick={this.showTeamSidebar}>
                    <a className="btn-floating btn-large grey">
                        <i className="material-icons"></i>
                    </a>
                </div>
            )
        }
});
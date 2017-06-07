TeamTool = React.createClass({
    /*Zustand für TeamSidebar*/
    getInitialState: function() {
        return {
            teamSidebar: false
        };
    },
    /*Bevor Komponente erstellt wird, soll TeamSidebar versteckt werden*/
    componentWillMount(){
        Session.set("TeamSidebar", false);
    },

    /*TeamSidebar soll angezeigt werden*/
    showTeamSidebar: function(){
        this.setState({
            teamSidebar: !this.state.teamSidebar
        });
        Session.set("TeamSidebar", !this.state.teamSidebar);
    },
    /*rendert Darstellung (Trigger-Icon für die Anzeige der TeamSidebar-Komponente)*/
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
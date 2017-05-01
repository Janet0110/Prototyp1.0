TeamList = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){
        var handle = Meteor.subscribe('myTeams', User.id());
        var teams = [];
        if(handle.ready()){
            teams = Teams.find({"users.user": User.id()}).fetch()
        }
        return{
            teams
        };
    },
    render: function(){
        return (

            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3" >
                        <div className="panel panel-login">
                            <div className="form-header">
                                <div className="col-xs-6">
                                    My Teams
                                </div>
                            </div>
                                <div className="row">
                                    <div className="collection">
                                        {this.renderTeamList()}
                                    </div>
                                </div>
                         </div>
                     </div>
                </div>
                <a href="/team"> Create a new team </a>
            </div>
        );
    },

    renderTeamList: function(){
        var teams = [];
        this.data.teams.map((doc) => {
            teams.push(<a href={'/teams/'+doc.name} className="collection-item">{doc.name}</a>)
        });
        return teams;
    }
});


HeaderAdmin = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){
        return{
            username: User.get().username,
            team: Session.get("team")
        }
    },
    logout: function(){
        Meteor.logout();
    },
    render() {
        var accountList = [{
            name: "Logout",
            onClick:  function(){
                Meteor.logout(function(err) {
                    if(!err){
                        FlowRouter.go("/")
                    }else{
                        Materialize.toast(err.message, 4000, "error");
                    }
                });
            }
        },{
            name: "changePassword"
        }];

        var accountName = this.getMeteorData().username;
        return (
            <nav className="header" >
                <div className="nav-wrapper" >
                    <div className="team-menu teamMenu" >
                        {this.getMeteorData().team}
                    </div>
                    <div className="channel-menu channelMenu" >
                        <ul id="nav-mobile" className="right hide-on-med-and-down ulList" >
                            <Dropdown name={accountName} list={accountList} selected={accountList[0]}/>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
});
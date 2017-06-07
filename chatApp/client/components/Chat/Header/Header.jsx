Header = React.createClass({
    /*Initialisierung von ReactMeteorData, um in der Komponente Meteors-Methoden anwenden zu können*/
    mixins: [ReactMeteorData],
    /*holt sich den Usernamen von Meteor und den aktuellen Teamnamen aus der Session*/
    getMeteorData(){
        return{
            username: User.get().username,
            team: Session.get("team")
        }
    },
    /*loggt Benutzer aus*/
    logout: function(){
      Meteor.logout();
    },
    /*rendert die Darstellung*/
  render() {
      /*erstellt für das Dropdown-Menü einzelne Unterpunkte mit einem onClick-Handler*/
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

      /*Anzeigename für das Dropdown-Menü*/
    var accountName = this.getMeteorData().username;
    return (
        <nav className="header" >
            <div className="nav-wrapper" >
                <div className="team-menu teamMenu" >
                    {this.getMeteorData().team}
                    <div className="toolbox">
                        <TeamTool/>
                    </div>
                </div>
                <div className="channel-menu channelMenu" >
                    <span className="channelInfo">
                        <span className="channel-menu-name channelMenuName" >
                            <span className="channel-menu-prefix channelPrefix" ># </span>
                                {Session.get("Channel")}

                        </span>
                        <span className="toolbox">
                               <ChannelTool/>
                               <ChannelInfo/>
                        </span>
                    </span>
                    <ul id="nav-mobile" className="right hide-on-med-and-down ulList" >
                        <Dropdown name={accountName} list={accountList} selected={accountList[0]}/>
                    </ul>
                </div>
            </div>
        </nav>
    );
  }
});
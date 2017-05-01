Listings = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){
        var teamname = Session.get("team");
        return {
            channels: Channels.find({"team.teamName": teamname}).fetch()
        };
    },
    getInitialState: function(){
        return{
            listVisible: false,
            inputValue: "",
            private: false,
            teamSidebar: false
        }
    },

    componentWillMount(){
        var teamSidebarState = new ReactiveVar({open: null });
        this.c = Tracker.autorun(() => {
            teamSidebarState.open = Session.get("TeamSidebar");
            this.setState({
                teamSidebar: teamSidebarState.open
            })
        });

    },
    componentWillUnmount() {
        this.c.stop()
    },
    openSidebar: function(state){
        this.setState({
            teamSidebar: state
        })
    },
    handleChange: function(){
        this.setState({
            private: !this.state.private
        });
    },
    show: function(){
        this.setState({listVisible: true});
        document.addEventListener('click', this.hide);
    },
    hide: function(){
        this.setState({listVisible: false});
        document.removeEventListener('click', this.hide);
    },
    render(){
       var teamSidebar = null;
       var buttonName = {
         name: "Create",
         onClick: this.createChannel
       };

        if(this.state.teamSidebar){
            teamSidebar  = <TeamSidebar />
        }else{
            teamSidebar = ""
        }

         return (
             <div>
               {teamSidebar}
               <div className="listings_Container">
                     <div className="listings_channels">
                         <div className="listings_header">
                             <span className="listings_header_text">
                                 Channels
                             </span>
                                 <DialogModal
                                     buttonType={<div className="listings_tools"></div>}
                                     header="Create a new Channel"
                                     content={this.renderForm()}
                                     buttonName = {buttonName}
                                  />
                         </div>
                            <ul>
                                {this.renderChannelList()}
                            </ul>
                     </div>
                 </div>
             </div>
           );
    },

    createChannel: function () {
        var team = Teams.findOne({name: Session.get("team")});
        Meteor.call("channels.add", team._id, this.state.inputValue, this.state.private, function(err){
            if(err){
                Materialize.toast(err.message, 10000, "error");
            }else{
                Materialize.toast("Channel created", 10000, "success");
            }
        });
        this.setState({
            inputValue: ""
        });
    },
    renderForm: function(){
      return(
        <div>
            <input type="text"value={this.state.inputValue} onChange={this.updateInputValue} placeholder="Channelname"></input>
            <div className= "channel-private" onClick={this.handleChange}>
                <p>
                    <input type="checkbox" checked={this.state.private}/>
                    <label for="test5">Private</label>
                </p>

            </div>
        </div>
      );
    },
    updateInputValue: function(evt) {
        this.setState({
            inputValue: evt.target.value
        });
    },
   renderChannelList: function(){
       var channels = [];

       this.data.channels.map((doc) => {
           channels.push(
                <Channel doc = {doc}/>
           )
       });
       return channels;
    }

});
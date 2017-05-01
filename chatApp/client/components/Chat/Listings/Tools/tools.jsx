ChannelTool = React.createClass({
    getInitialState: function(){
        return{
            deletePopUp: false
        }
    },
    render(){
       var channelSettingName = "Settings";
       var buttonName = {
           name: "Delete",
           onClick: this.deleteChannel,
           close: this.closeDialog
       };

       if(this.state.deletePopUp){
           deleteDialog = <DialogModalPopUp header="Channel delete" content="Do you really delete channel?"  buttonName = {buttonName} />
       }else{
           deleteDialog = null
       }
       return(
            <div>
                <ul id="nav-mobile" className="right hide-on-med-and-down ulList" >
                    <DropdownMenuParent name={channelSettingName}>
                            <DropDownMenuChild onClick={this.warningPopUp} nameButton="Remove channel"/>
                    </DropdownMenuParent>
                </ul>
                {deleteDialog}
            </div>
       )
   },
    warningPopUp: function(){
        this.setState({
            deletePopUp: !this.state.deletePopUp
        });
    },
    closeDialog: function(){
        this.setState({
            deletePopUp: !this.state.deletePopUp
        });
    },

    deleteChannel: function(){
    var channelId = currentChannelId();
        Meteor.call('delete', channelId, Meteor.userId(),function(err){
            if(err){
                Materialize.toast(err, 4000, "error");
            }else{
                Materialize.toast("Channel deleted", 4000, "success");
                FlowRouter.go(history.back());
                this.setState({
                    deletePopUp: !this.state.deletePopUp
                });
            }
        })
    },
    renderForm: function(){
      return (
          <span>"jfhdj"</span>
      )
    },

    buttonType: function(){
        var self = this;
        var channelSettingName = "Settings";
        return (
            <ul id="nav-mobile" className="right hide-on-med-and-down ulList" >
                <Dropdown name={channelSettingName} list={channelSettingList} selected={channelSettingList[0]}/>
            </ul>
        )
    }
});

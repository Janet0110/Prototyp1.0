Channels = new Meteor.Collection('channels');

/*liefert aktuellen Channel*/
currentChannel = function () {
    var channel = null;
    if(Meteor.userId()){
        channel = Channels.findOne({ name: Session.get("Channel")});
    }
    return channel;
};

/*liefert aktuelle ChannelId*/
currentChannelId = function(){
    var channel = currentChannel();
    return channel? channel._id : null;
};

/*liefert aktuelle ChannelId durch Angabe von ChannelName und TeamID*/
getChannelId = function(channelName, teamId){
    var channelObj = Channels.findOne({ name: channelName, 'team._id': teamId}, { fields: {
        _id: 1
    }});
    return channelObj._id;
};

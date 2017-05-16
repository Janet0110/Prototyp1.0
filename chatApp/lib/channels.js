Channels = new Meteor.Collection('channels');


currentChannel = function () {
    var channel = null;
    if(Meteor.userId()){
        channel = Channels.findOne({ name: Session.get("Channel")});
    }
    return channel;
};

currentChannelId = function(){
    var channel = currentChannel();
    return channel? channel._id : null;
};

getChannelId = function(channelName, teamId){
    var channelObj = Channels.findOne({ name: channelName, 'team._id': teamId}, { fields: {
        _id: 1
    }});
    return channelObj._id;
};

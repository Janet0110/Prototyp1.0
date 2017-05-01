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
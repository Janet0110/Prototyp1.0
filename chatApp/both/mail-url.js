if (Meteor.isServer) {
    Meteor.startup(function () {
        process.env.MAIL_URL = "smtp://EMAIL:Password@smtp.live.com:587";
        process.env.ROOT_URL = "http://localhost:3000";
    })
}


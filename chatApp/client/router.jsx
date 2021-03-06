FlowRouter.route('/', {
    triggersEnter: [function(context, redirect) {
        redirect('/login');
    }],
});

FlowRouter.route('/login', {
    name: 'login',
    action: function () {
        ReactLayout.render(BlankLayout, {
            content: <Login />
        });
    },
    triggersEnter: [isLoggedIn]
});

FlowRouter.route('/register', {
    name: 'register',
    action: function () {
        ReactLayout.render(BlankLayout, {
            content: <Register />
        });
    }
});

FlowRouter.route('/teams', {
    name: 'teamList',
    subscriptions: function(params) {
        if(Meteor.userId()) {
            this.register('teams', Meteor.subscribe('myTeams', Meteor.userId()));
        }
    },
    action: function () {
        ReactLayout.render(BlankLayout, {
            content: <TeamList />
        });
    },
    triggersEnter: [isLoggedIn]
});

FlowRouter.route('/team', {
    name: 'teamCreate',
    action: function () {
        ReactLayout.render(BlankLayout, {
            content: <TeamCreate />
        });
    },
});

var teamGroup = FlowRouter.group({
    prefix: '/teams/:team',
    name:"team",
    subscriptions: function(params) {
        this.register('channels', Meteor.subscribe('teamChannels', params.team));
        this.register('teams', Meteor.subscribe('getTeamByName', params.team));
        this.register('users', Meteor.subscribe('users'));

    },
    triggersEnter: [function(context, redirect) {
    }]
});

teamGroup.route('/', {
    triggersEnter: [function(context, redirect) {
        redirect(context.path + "/channel/general")
    }]
});

teamGroup.route('/channel/:channel',{
   name:"channel",
    subscriptions: function(params){
        this.register("messages", Meteor.subscribe('channelMessages', params.channel, params.team));
    },
    action(params, queryParams){
        ReactLayout.render(MainLayout, {
        sidebar: <Listings /> ,
        content: <MessageContainer  />
    });
    },
    triggersEnter:[function(context, redirect, params){
        if(Meteor.userId()){
            Session.set("Channel", context.params.channel);
            Session.set("team", context.params.team);
        }
    }],
    triggersExit:[function(context){
        if(Meteor.isClient){
            Session.set('Channel', undefined);
            Session.set('team', undefined);
        }
    }]
});
teamGroup.route('/permissions', {
    name:"permissions",
    action(params, queryParams){
        ReactLayout.render(AdminLayout, {
            header: <HeaderAdmin /> ,
            content: <PermissionsPage  />
        });
    },
    subscriptions: function(params){
        this.register("roles", Meteor.subscribe('roles', Meteor.userId()));
        this.register("permissions", Meteor.subscribe('permissions', Meteor.userId()));
    },
    triggersEnter:[function(context, redirect, params){
        if(Meteor.userId()){
            Session.set("team",context.params.team);
        }
    }]
});

teamGroup.route('/roles', {
    name:"roles",
    action(params, queryParams){
        ReactLayout.render(AdminLayout, {
            header: <HeaderAdmin /> ,
            content: <UserRoles  />
        });
    },
    subscriptions: function(params){
        this.register("roles", Meteor.subscribe('roles', Meteor.userId()));
        this.register("permissions", Meteor.subscribe('permissions', Meteor.userId()));
        this.register("userRoles", Meteor.subscribe('userRolesInChannel', Meteor.userId(), params.team));
    },
    triggersEnter:[function(context, redirect, params){
        if(Meteor.userId()){
            Session.set("team",context.params.team);
        }
    }]
});

function isLoggedIn(context, doRedirect) {
    if (User.isLoggedIn()) {
        if (!Session.get("team")){
            FlowRouter.go('/teams');
        }else{
            FlowRouter.go('/login');
        }
    } else {
        FlowRouter.go('/login');
    }
}

FlowRouter.notFound = {
    action() {
        ReactLayout.render(BlankLayout, { content: <NotFound /> });
    }
};

FlowRouter.route('/invite/:inviteId', {
    name: 'invite',
    action: function (params) {
        ReactLayout.render(BlankLayout, {
            content: <Invite inviteId={params.inviteId} />
        });
    },
});





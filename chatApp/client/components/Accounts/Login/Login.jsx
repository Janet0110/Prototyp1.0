Login = React.createClass({
    onSubmit(e){
        e.preventDefault();
        var formData = e.target;

        var username = formData.username.value;
        var password = formData.password.value;

        Meteor.loginWithPassword(username, password, function(err){
            if(!err){
                FlowRouter.go("/teams");
            }else{
                Materialize.toast(err.message, 4000);
            }
        })
    },

    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3" >
                        <div className="panel panel-login">
                            <div className="form-header">
                                <div className="col-xs-6">
                                    Login
                                </div>
                            </div>
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-lg-12 col">
                                        <form onSubmit={this.onSubmit}>
                                            <div className="form-group">
                                                <input id="loginUsername" type="text" name="username" className="username" placeholder="Username or Email"></input>
                                            </div>
                                            <div className="form-group">
                                                <input id="loginPassword" type="password" className="password" name = "password" placeholder="Password"></input>
                                            </div>
                                            <div className="form-group">
                                                    <div className="col-sm-6 col-sm-offset-3">
                                                        <button ref="target1"  name="login-submit" id="login-submit"
                                                                className="form-control btn btn-login"
                                                                value="Register">Login</button>
                                                    </div>
                                            </div>
                                            <a className="link-register-login" id="registerLink" href="/register">Register</a>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
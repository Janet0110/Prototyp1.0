Register = React.createClass({
    /*Form-Submit, um ein Benutzer zu registrieren und einzuloggen.
     Holt sich die eingegebenen Werte und überprüft ob, Eingaben stimmen und leitet loggt Benutzer gleich mit den eingegebenen Werte ein*/
   onSubmit(e){
        e.preventDefault();
        var formData = e.target;

        var email = formData.email.value;
        var username = formData.username.value;
        var password = formData.password.value;

       var accountInfo = {
           email: email,
           password: password,
           username: username
       };

       /*Benutzer wird erstellt und anschließend eingeloggt*/
       User.create(accountInfo, function(err){
          if(!err){
                Meteor.loginWithPassword(username, password, function(err){
                    if(!err){
                        FlowRouter.go("/teams");
                        Materialize.toast("Login successfull", 4000, "success");
                    }else{
                        Materialize.toast("Something goes wrong!", 4000);
                    }
                })
          }else{
              Materialize.toast(err.message, 4000, 'error');
          }
       });
   },
    render(){
       return (
               <div className="container">
                   <div className="row">
                       <div className="col-md-6 col-md-offset-3" >
                           <div className="panel panel-login" >
                               <div className="form-header">
                                   <div className="col-xs-6">
                                       Register
                                   </div>
                               </div>

                               <div className="panel-body">
                                   <div className="row">
                                       <div className="col-lg-12 col">
                                           <form onSubmit={this.onSubmit}>
                                               <div className="form-group">
                                                   <input id="registerUsername" type="text" name="username" className="username" placeholder="Username"></input>
                                               </div>
                                               <div className="form-group">
                                                   <input id="registerEmail" type="text" className="email" name ="email" placeholder="Email"></input>
                                               </div>
                                               <div className="form-group">
                                                   <input id="registerPassword" type="password" className="password" name = "password" placeholder="Password"></input>
                                               </div>


                                               <div className="form-group">
                                                   <div className="row">
                                                       <div className="col-sm-6 col-sm-offset-3">
                                                           <button  ref="target" name="register-submit" id="register-submit"
                                                                  className="form-control btn btn-register" value="Register">Register</button>
                                                        </div>
                                                    </div>
                                                </div>
                                               <a className="link-register-login" id="loginLink" href="/login">Login</a>
                                           </form>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
       )
   }
});
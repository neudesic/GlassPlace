(function() {

window.Glaze = Ember.Application.create();

// Default load order. Override as you see fit.


})();

(function() {

Glaze.Store = DS.Store.extend({
  revision: 12,
  adapter: DS.FixtureAdapter.create()
});


})();

(function() {

Glaze.Index = DS.Model.extend({
});


})();

(function() {

Glaze.Login = DS.Model.extend({
    username: DS.attr("string"),
    password: DS.attr("string")
});


})();

(function() {

Glaze.IndexController = Ember.Controller.extend({
    sayHello:function(){
        console.log("hello");
    }
});


})();

(function() {

Glaze.LoginController = Ember.Controller.extend({
    loginToPulse:function() {
        var self = this;
        var data = {
            username: $("#username").val(),
            password: $("#password").val(),
            clientKey:"{2AD95EEC-8AF6-4BAF-835F-DBDC6E626EB7}",
            clientVersion:"1.0.0.0"
        };

        $.ajax({
            type: 'POST',
            url: '/pulse/auth',
            contentType: 'application/json; charset=utf-8',
            success: function(result) {
                self.transitionTo("confirm");
            },
            processData: false,
            data: JSON.stringify(data)
        });
    }
});


})();

(function() {

Glaze.IndexView = Ember.View.extend({
    willInsertElement:function(){
        console.log("inserting");
        var controller = this.get("controller");

        window.getProfile = function() {
            gapi.client.load("oauth2", "v2", function() {
                var req = gapi.client.oauth2.userinfo.get();
                req.execute(function(obj) {
                    $("#avatar").attr("src", obj.picture);
                    $("#profile").show();
                });
            });
        };
        window.signInCallback = function( auth ){
            if (auth.code) {

                // Hide the sign-in button now that the user is authorized, for example:
                $('#signinButton').attr('style', 'display: none');

                gapi.auth.setToken(auth);

                getProfile();
                /*
                 * Step 6: Send the authorization code to the server
                 */
                var data = {
                    'code': auth.code,
                    'state': window.clientStateToken
                };
                $.ajax({
                    type: 'POST',
                    url: '/google/auth',
                    contentType: 'application/json; charset=utf-8',
                    success: function(result) {
                        // Handle or verify the server response if necessary.

                        // Prints the list of people that the user has allowed the app to know
                        // to the console.
                        controller.transitionToRoute("login");
                        console.log(result);
                    },
                    processData: false,
                    data: JSON.stringify(data)
                });
            } else if (auth.error) {
                // There was an error.
                // Possible error codes:
                //   "access_denied" - User denied access to your app
                //   "immediate_failed" - Could not automatially log in the user
                console.log('There was an error: ' + auth.error);
            }
        };
    }
});



})();

(function() {

Glaze.LoginView = Ember.View.extend({
});


})();

(function() {

Glaze.Router.map(function() {
    this.resource("login");
    this.resource("confirm");
});


})();

(function() {

Glaze.IndexRoute = Ember.Route.extend({
});


})();

(function() {

Glaze.LoginRoute = Ember.Route.extend({
//    model:function() {
//        return Glaze.Login.create({
//            username:"user"
//        });
//    },
//    setupController: function(controller, model) {
//        controller.set('model', model);
//    }
});


})();

(function() {

// Create fixtures



})();
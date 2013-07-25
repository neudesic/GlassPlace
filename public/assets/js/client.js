(function(global){
  'use strict';

//    global.getProfile = function() {
//        gapi.client.load("oauth2", "v2", function() {
//            var req = gapi.client.oauth2.userinfo.get();
//            req.execute(function(obj) {
//                console.log("Got response");
//                console.log(obj);
//                $("#avatar").attr("src", obj["picture"]);
////                $("#name").text(obj["name"]);
//                $("#profile").show();
////                $("#profile").html(obj["email"]);
//            });
//        });
//    };
//
//    global.signInCallback = function( auth ){
//    if (auth['code']) {
//
//      // Hide the sign-in button now that the user is authorized, for example:
//      $('#signinButton').attr('style', 'display: none');
//
//      gapi.auth.setToken(auth);
//
//        getProfile();
//      /*
//       * Step 6: Send the authorization code to the server
//       */
//      var data = {
//        'code': auth['code'],
//        'state': global.clientStateToken
//      };
//      $.ajax({
//        type: 'POST',
//        url: '/google/auth',
//        contentType: 'application/json; charset=utf-8',
//        success: function(result) {
//          // Handle or verify the server response if necessary.
//
//          // Prints the list of people that the user has allowed the app to know
//          // to the console.
//          console.log(result);
//        },
//        processData: false,
//        data: JSON.stringify(data)
//      });
//    } else if (auth['error']) {
//      // There was an error.
//      // Possible error codes:
//      //   "access_denied" - User denied access to your app
//      //   "immediate_failed" - Could not automatially log in the user
//      console.log('There was an error: ' + auth['error']);
//    }
//  }

})(this);
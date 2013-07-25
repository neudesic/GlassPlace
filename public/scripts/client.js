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
window.getProfile = function () {
    gapi.client.load("oauth2", "v2", function () {
        var req = gapi.client.oauth2.userinfo.get();
        req.execute(function (obj) {
            $("#avatar").attr("src", obj.picture);
            $("#profile").show();
        });
    });
};

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

window.signInCallback = function (auth) {
    if (auth.code) {

        // Hide the sign-in button now that the user is authorized, for example:
        $('#signinButton').attr('style', 'display: none');
        gapi.auth.setToken(auth);
        getProfile();
        /*
         * Step 6: Send the authorization code to the server
         */
console.log("the code ");
        console.log(auth.code);
        var data = {
            'code': auth.code,
            'state': window.clientStateToken
        };
        $.ajax({
            type: 'POST',
            url: '/google/auth',
            contentType: 'application/json; charset=utf-8',
            success: function (result) {
                $.ajax({
                    type: 'POST',
                    url: '/auth',
                    contentType: 'application/json; charset=utf-8',
                    data:JSON.stringify({
                        'gpCode': "DOVXR43ef3v7WqPY",
                        'session': result.session
                    }),
                    processData:false
                });
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

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

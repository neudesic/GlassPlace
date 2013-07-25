
module.exports = function(app, config) {
    var google = require("../routes/google")(config);




    app.post("/google/auth", google.auth);

    var pulse = require("../routes/pulse")(config);

    app.post("/auth", pulse.authenticate);
    app.post("/share", pulse.share);

    app.post("/share", function(req, res) {
        console.log("got a share");
        console.log(req.body);
        res.send({});
    });
}
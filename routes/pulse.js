var request = require("request");
var googleapis = require('googleapis');
var Redis = require('redis');
var FormData = require('form-data');
var URL = require("url");
var Kaiseki = require('kaiseki');
var https = require('https');

module.exports = function (config) {
    var REDIRECT_URL = 'postmessage';
    var client;
    var now = function () {
        return (new Date()).toISOString();
    };


    var kaiseki = new Kaiseki(config.parse.APP_ID, config.parse.MASTER_KEY);
    googleapis
        .discover('plus', 'v1')
        .discover("mirror", "v1")
        .execute(function (err, data) {
            client = data;
            console.log("client initialized");
        });
    function initializeMirror(oauth2, userId) {
        client.mirror.contacts.insert({
            "resource": {
                "id": "Glass Place",
                "displayName": "Glass Place",
                "iconUrl": "https://glaze.aws.af.cm/images/contact.png",
                "priority": 70000,
                "acceptTypes": [
                    "image/*"
                ]
            }
        }).withAuthClient(oauth2).execute();
        client.mirror.subscriptions.insert({
            "resource": {
                "collection": "timeline",
                "userToken": userId,
                "operation": ["UPDATE", "INSERT"],
                "callbackUrl": "https://glass.groupplace.com/share"
            }
        }).withAuthClient(oauth2).execute();
        client.mirror.timeline.insert({
            "resource": {
                "title": "Welcome to Glass Place",
                "text": "Share a picture with Glass Place to post it on GP",
                "speakableText": "Share a picture with Glaze to post it on Group Place.",
                "notification": {"level": "DEFAULT", deliveryTime: now()},
                "menuItems": [
                    {"action": "READ_ALOUD"},
                    {"action": "TOGGLE_PINNED"},
                    {"action": "DELETE"}
                ]}
        })
            .withAuthClient(oauth2)
            .execute(function (err, result) {
                console.log(err);
            });
    }

    function getOauthClient(credentials) {
        var oauth2 = new googleapis.OAuth2Client(config.google.clientId,
            config.google.clientSecret,
            REDIRECT_URL);
        oauth2.credentials = {
            access_token: credentials.access_token,
            refresh_token: credentials.refresh_token
        };
        return oauth2;
    }

    this.share = function (req, res) {
        console.log(req.headers);
        console.log(req.body);

        kaiseki.getObject("GlassPlaceUsers", req.body.userToken || "test", function (err, resp, glazeUserInfo, success)
        {
            console.log("guiinfo");
            console.log(glazeUserInfo);
            var oauth2 = getOauthClient(glazeUserInfo.session.credentials);
            console.log("getting timeline item");
            var itemId = req.body.itemId;
            client.mirror.timeline.get({id: itemId})
                .withAuthClient(oauth2)
                .execute(function (err, result) {
                    console.log("timeline item:");
                    console.log(err);
                    console.log(result);
                    if (!err) {
                        var attachmentToGet = {attachmentId: result.attachments[0].id, itemId: itemId};
                        console.log("getting attachment");
                        var attachmentUrl = result.attachments[0].contentUrl;
                        var photo = request({
                            method: "GET",
                            url: attachmentUrl,
                            headers: {"Authorization": "Bearer " + glazeUserInfo.session.credentials.access_token}
                        }, function (err, response, body) {
                            console.log("got attachment" + attachmentUrl);
                            var form = new FormData();
                            var options = {

                                "type":"core:status",
                                "text":"ThroughGlassPlace"
                            };

                            Object.keys(options).forEach(function (x) {
                                form.append(x, options[x]);
                            });
                            form.append('file', body);
                            var gpUrl = "https://www.groupplace.com/api/graph/collection/11835/post?access_token=" + glazeUserInfo.gpCode;
                            console.log("URL FOR GP: " + gpUrl);
                            var parsedURL = URL.parse(gpUrl);
                            console.log("PARSED URL");
                            console.log(parsedURL);

                            parsedURL.method = 'POST';
                            parsedURL.headers = form.getHeaders();

                            var request = https.request(parsedURL);
                            form.pipe(request);
                            request.on('response', function (res) {
                                console.log(res);
                            });
                            request.on('error', function(err) {
                               console.log(err);
                            });
                        });
                    }
                });
        });

        res.send({});
    }
    function validateCredentialsWithPulse(credentials, handler) {
        var pulse = request({
            method: "POST",
            url: config.pulse.BASE_URL + "/access/authorize",
            body: JSON.stringify(credentials),
            headers: {"content-type": "application/json"}
        }, handler);
        return pulse;
    }

    this.authenticate = function (req, res) {

        console.log("Sess creds in pulse");
        console.log(req.body.session.credentials);
        console.log(config.google);
        var oauth2 = new googleapis.OAuth2Client(config.google.clientId,
            config.google.clientSecret,
            REDIRECT_URL);
        var googleAuthCode = req.body.session.code;
        var gpCode = req.body.gpCode;

        console.log("BODY");
        console.log(req.body);

        oauth2.credentials = req.body.session.credentials;
        oauth2.getToken(googleAuthCode, function (err, tokens) {
            console.log(err);
            oauth2.credentials = req.body.session.credentials;
            req.session.code = googleAuthCode;
            req.session.credentials = tokens;

            console.log(tokens);
//        var redisClient = Redis.createClient(6379, "10.0.1.226");
//
//        redisClient.set(gpCode, googleAuthCode);

            console.log("The body");
            console.log(req.body);
            var params = {
                where: { username: gpCode || "test" },
                count: true
            };
            kaiseki.getObjects("GlassPlaceUsers", params, function (err, res, body, success) {

                if (body.count > 0) {
                    if (body.results[0].password === req.body.password) {
                        kaiseki.updateObject("GlassPlaceUsers", body.objectId, req.body, function (err, res, body, success) {
                            console.log("updated user info");
                        });
                    }
                } else {
                    kaiseki.createObject("GlassPlaceUsers", req.body, function (err, res, body, success) {
                        console.log("The object id:");
                        console.log(body.objectId);

                        initializeMirror(oauth2, body.objectId);
                    });
                }
            });


            res.send({});
        });
    }
    return this;
}
exports.share = this.share;
exports.auth = this.authenticate;


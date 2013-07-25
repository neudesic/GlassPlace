module.exports = {
    development: {
        port: process.env.PORT || 8081,
        root: require("path").normalize(__dirname + "/.."),
        app: {
            name: "GlassPlace"
        },
        google: {
            clientId: "340409559435.apps.googleusercontent.com",
            clientSecret: "8yv1iOY1N9CVkAFoEvKu_zML"
        },
        parse: {
            APP_ID: "yyHHd2LM79tXFeP7WVQnveK3VZBAXO0TCu6O9C2y",
            MASTER_KEY: "Dwsuxpnzr7ubxQNQduEHiCE1AC6vMMZp9C9100s3"
        }
    },
    production: {

    }
}
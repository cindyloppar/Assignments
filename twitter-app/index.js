
var request = require('request');
var express = require("express");
var myapp = express();
var qs = require('querystring');

myapp.get("/", function (req, res) {
    var url = "https://api.twitter.com/1.1/statuses/update.json";

});
const config = {
    consumerKey: "IPuxZ08g4OGleP6jjlR9pIgg7",
    consumerSecret: "W6mbeS8gHWpN9yvrNsxsRQkgEbFFCc8z7Zme9TSfDqShGHl52J",
}
myapp.get('/authorize/twitter', (req, res) => {
    getRequestToken((err, data) => {
        if (err) {
            res.statusCode(500).end();
        }
        res.send("<a href='https://api.twitter.com/oauth/authorize?oauth_token=" + data.oauth_token + "'>Authorize Twitter</a>");
    });
});


const url = 'https://api.twitter.com/1.1/statuses/update.json';

var oauth = {
    consumer_key: "IPuxZ08g4OGleP6jjlR9pIgg7",
    consumer_secret: "W6mbeS8gHWpN9yvrNsxsRQkgEbFFCc8z7Zme9TSfDqShGHl52J",
    token: "4900007938-gYKUiw9WgEyhwKVYgMp3M8WcjNiJcU5p51KFEO1",
    token_secret: "ulYnmItVRdbakx4YYffxLBsxaWKKdzkeJC1n2JdghRoy5"
};

var statusUpdateOptions = {
    url: url,
    oauth: oauth,
    qs: {
        status: "testing my twitter  "
    }
};

function getRequestToken(cb) {
    var oauth = {
        callback: 'http://localhost:3000/twitter/callback'
        , consumer_key: config.consumerKey
        , consumer_secret: config.consumerSecret
    };
    request.post({
        url: 'https://api.twitter.com/oauth/request_token',
        oauth: oauth
    }, function (e, r, body) {
        if (e) {
            console.log(e);
            cb(e);
            return;
        };

        var data = qs.parse(body);
        cb(null, data);
    });
}


request.post(statusUpdateOptions,
    function (err, httpResponse, body) {
        console.log("http response code", httpResponse.statusCode);
        console.log("http response body", httpResponse.body);

        if (err) {
            console.log(err);
        }
    });

function getAccessToken(oauthVerifier, requestToken, cb) {
    var oauth = {
        consumer_key: config.consumerKey,
        consumer_secret: config.consumerSecret,
        token: requestToken
    };
    console.log("oauth = ", oauth);

    request.post({
        url: 'https://api.twitter.com/oauth/access_token',
        oauth: oauth,
        qs: { oauth_verifier: oauthVerifier }
    }, function (e, r, body) {
        console.log("body = ", body);
        if (e) {
            console.log(e);
            cb(e);
            return;
        };


        var data = qs.parse(body);
        cb(null, data);
    });

}

function getRequestToken(cb) {
    var oauth = {
        callback: 'http://localhost:3000/twitter/callback'
        , consumer_key: config.consumerKey
        , consumer_secret: config.consumerSecret
    };
    request.post({
        url: 'https://api.twitter.com/oauth/request_token',
        oauth: oauth
    }, function (e, r, body) {
        if (e) {
            console.log(e);
            cb(e);
            return;
        };

        var data = qs.parse(body);
        cb(null, data);
    });
}

myapp.get('/', (req, res) => res.send('<h1>Hello World!</h1>'));

myapp.listen(3000, () => console.log('The server is listening on port 3000!'))



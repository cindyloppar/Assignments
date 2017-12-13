var request = require('request');
var express = require("express");
var myapp = express();
const url = 'https://api.twitter.com/1.1/statuses/update.json';
var oauth = {
    consumer_key: "IPuxZ08g4OGleP6jjlR9pIgg7",
    consumer_secret: "W6mbeS8gHWpN9yvrNsxsRQkgEbFFCc8z7Zme9TSfDqShGHl52J",
    token: "4900007938-gYKUiw9WgEyhwKVYgMp3M8WcjNiJcU5p51KFEO1",
    token_secret: "ulYnmItVRdbakx4YYffxLBsxaWKKdzkeJC1n2JdghRoy5"
};
    access_point = {
        url: url,
        oauth: oauth,
        qs: {
            status: "It's working"
        }
    };

;
request.post(access_point, function (err, res, body) {
    console.log("http res code", res.statusCode)
    console.log("http res body", res.body)
    if (err) {
        console.log(err);

    }
    myapp.get("/", function (req, res) {
        res.send("hello world");
    });

    myapp.listen(3000, () => console.log("working"));




})


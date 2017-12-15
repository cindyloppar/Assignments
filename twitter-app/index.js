

var request = require('request');
var express = require("express");
var myapp = express();
var qs = require('querystring')
//  var req_data = qs.parse(body)

myapp.get("/tweet", function (req, res) {

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
            status: req.query.status
        }
    };

   request.post(statusUpdateOptions,
               function(err,httpResponse,body){
                 console.log("http response code", httpResponse.statusCode);
                 console.log("http response body", httpResponse.body);

                 if (err){
                   console.log(err);
                 }
               });
});



myapp.get('/tweet', (req, res) => res.send('<h1>Hello World!</h1>'));

myapp.listen(3000, () => console.log('The server is listening on port 3000!'))


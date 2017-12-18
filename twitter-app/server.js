
const express = require('express');
var app = express();

app.get('/', (req, res) => res.send('Hello World!'));
<a href = "https://api.twitter.com/oauth/access_token" > twitter link</a>
app.listen(3000, () => console.log('Example app listening on port 3000!'));

// 
//     , oauth =
//         {
//             callback: 'http://mysite.com/callback/'
//             , consumer_key: " IPuxZ08g4OGleP6jjlR9pIgg7"
//             , consumer_secret: "W6mbeS8gHWpN9yvrNsxsRQkgEbFFCc8z7Zme9TSfDqShGHl52J"
//         }
//     , url = 'https://api.twitter.com/oauth/access_token'
//     ;
// request.post({ url: url, oauth: oauth }, function (e, r, body) {
//     // Ideally, you would take the body in the response
//     // and construct a URL that a user clicks on (like a sign in button).
//     // The verifier is only available in the response after a user has
//     // verified with twitter that they are authorizing your app.


//    
//     var uri = 'https://api.twitter.com/oauth/access_token'
//         + '?' + qs.stringify({ oauth_token: req_data.oauth_token })


  
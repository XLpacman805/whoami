// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const addr = require("proxy-addr");

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://www.freecodecamp.org"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('views'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/api/whoami", (req, res) => {
  let agent = req.headers["user-agent"];
  let lang = req.headers["accept-language"];
  
  let ip = addr(req, (trust) =>{
    return trust; 
  });
  
  res.json(
    {ipaddress: ip,
     language: lang,
     software: agent
  });
  
});

// listen for requests :) 
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const addr = require("proxy-addr");

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('views'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/api/me", (req, res) => {
  var agent = req.headers["user-agent"];
  var agentBegin = agent.indexOf("(")+1;
  var agentEnd = agent.indexOf(")");
  agent = agent.slice(agentBegin, agentEnd);
  var lang = req.headers["accept-language"];
  var langEnd = lang.indexOf(","); //trims off excess data
  lang = lang.slice(0, langEnd);
  
  var ip = addr(req, (trust) =>{
    return trust; 
  });
  
  res.end(JSON.stringify(
    {ipaddress: ip,
     language: lang,
     software: agent
  }));
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

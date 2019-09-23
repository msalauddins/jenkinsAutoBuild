const express = require('express');
const app = express();

app.use(express.json());
app.set('json spaces', 4);
app.use(express.static('files'))

const bodyParser = require('body-parser'); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/send', function(req, res) {        
    var send_mail_module = require("./module.js");
    send_mail_module.module1();
    res.send('sending email....');
  });

  app.get('/new', function(req, res) {
    require('fs').readFile('templates/create_user.html', 'utf8', function(err, data){
      if(err) throw err;
      res.send(data);
    })
  });

  app.post("/new/user", function(req, res){
    //This will give acces the user data to module1
    let u = req.body;
    console.log(u);
    module.exports.u = u;
    
   //Calling module1 
   var send_mail_module = require("./module.js");
   send_mail_module.module1();

  res.sendFile(__dirname + '/templates/success_message.html');
  });

app.listen(4000, function () {
    console.log('Server is listening on port 4000')
  });






  
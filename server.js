// server.js
// where your node app starts

// init project
var express = require('express');
var moment = require('moment');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/timestamp/:date_string', function (req, res) {

    var timeStamp = req.params.date_string;
    
    var timeObj = {
        "unix" : null,
        "utc": null
    };
    
    try {
        
        var naturalTime = timeStamp.toString().split('-');
        
       if(naturalTime.length == 0){
         let currentDate = new Date();
          timeObj["unix"] = currentDate.getTime();
          timeObj["utc"] = currentDate.toUTCString();
       }
      
        else if (naturalTime.length === 3) {
            
            var getDate = new Date(timeStamp.toString());
            timeObj["unix"] = getDate.getTime()/1000; 
            timeObj["utc"] = getDate.toUTCString();
            //response.write('Natural Date!');

        } else {
            throw new Error('Not Iso Formatt'); 
        }

    } catch (err1) {
  
        
          
                timeObj["unix"] = null;
               
                timeObj["utc"] = null;
            
        
    }

    res.send(timeObj);
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
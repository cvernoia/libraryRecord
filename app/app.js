const express = require('express');
const app = express();
const path = require("path");
const bodyParser = require('body-parser');


app.use("/client",express.static(path.resolve(__dirname + "/../client")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//Make the server
var server;
var port = process.env.PORT || process.env.NODE_PORT || 4400;


//Router Listeners
var router = require ("./router.js");
router(app);

//Service Listeners
var services = require("./services.js");
services(app);

//App Listener 
server = app.listen(port, function(err){
    if(err){
        throw err;
    }
    console.log("Listening on port " + port);
});
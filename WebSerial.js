var http    = require('http')
var express = require('express');
var app     = express();
var morgan  = require('morgan');

var bodyParser = require('body-parser');


// configure app
app.use(morgan('dev'));     // Log requests to console

// configure body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// Configure database (using mongodb)
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/neiltestdb');
var Command = require('./models/Command');


// ROUTES FOR OUR API
// ======================================================================

// create the router
var router = express.Router();

router.use(function(req, res, next){
    console.log('A request is coming');
    next();
});

router.get('/', function(req, res){
    res.json({message: 'Welcome to api test'});
});

router.route('/commands')
    .post(function(req, res){
        serialPort.write(req.body.command);

    })
    .get(function(req, res){
       Command.find(function(err, commands){
           if(err)
               res.send(err);
           res.json(commands);
       })
    });

// Serial port functions.
var SerialPort = require("serialport").SerialPort;
var serialPort = new SerialPort("/dev/ttyUSB0", {
    baudrate: 57600
}, false); // this is the openImmediately flag [default is true]

serialPort.open(function (error) {
    if ( error ) {
        console.log('failed to open: '+error);
    } else {
        console.log('Serial Port open');
        serialPort.on('data', function(data) {
            console.log('data received: ' + data);
            var command = new Command();
            command.command = data;
            var date = new Date();
            command.time = date.getDay().toString() 
                + date.getHours().toString() 
                + date.getMinutes().toString()
                + date.getSeconds().toString() 
                + date.getMilliseconds().toString();
            command.save(function(err){
                if(err)
                    console.log(err);
                console.log('Command Received');
            })

        });

        serialPort.write("Hello World!\n", function(err, results) {
            console.log('err ' + err);
            console.log('results ' + results);
        });
    }
});

console.log('Serial Port Running');

// REGISTER OUR ROUTES ---------------------------------------------
app.use('/api', router);

// START THE Server ------------------------------------------------
app.listen(port);
console.log('Server Start');

var http    = require('http')
var express = require('express');

http.createServer(function(requrest, response){
    response.writeHead(200, {'Content-Type':'text/plain'});
    response.end('Hello World\n');
}).listen(8080);

console.log('Server Running');


var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/ttyUSB0", {
    baudrate: 57600
}, false); // this is the openImmediately flag [default is true]

serialPort.open(function (error) {
    if ( error ) {
        console.log('failed to open: '+error);
    } else {
        console.log('open');
        serialPort.on('data', function(data) {
            console.log('data received: ' + data);
        });

        serialPort.write("Hello World!\n", function(err, results) {
            console.log('err ' + err);
            console.log('results ' + results);
        });
    }
});

console.log('Serial Port Running');

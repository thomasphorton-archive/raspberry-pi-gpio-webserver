var express = require('express');
var app = express();
var gpio = require('rpi-gpio');
var pin = 11;

app.set('view engine', 'jade');

gpio.setup(pin, gpio.DIR_OUT);

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render('index');
});

var bool = true;
var timeout;

app.get('/test', function(req, res) {
  console.log('Pin Toggled: ' +  bool);

  togglePin(bool);
  bool = !bool;

  res.render('index');
});

app.get('/off', function(req, res) {
  clearInterval(timeout);
  togglePin(false);

  console.log('Pin #' + pin + ' turned off');
  res.render('index');
});

app.get('/on', function(req, res) {
  clearInterval(timeout);
  togglePin(true);

  console.log('Pin #' + pin + ' turned on');
  res.render('index');
});

app.get('/test2', function(req, res) {
  tone(831);
  res.render('index');
});

app.get('/test3', function(req, res) {
  tone(220);
  res.render('index');
});
 
function togglePin(val) {
  gpio.write(pin, val, function(err) {
    if (err) throw err;
  });
}

function tone(note) {
  var bool = true;
  var interval = 500 / note;

  clearInterval(timeout);

  timeout = setInterval(function() {
    togglePin(bool)
    bool = !bool;
  }, interval);

  setTimeout(function() {
    clearInterval(timeout);
  }, 250);

}

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);
});

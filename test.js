var gpio = require('rpi-gpio');
var pin = 11;

gpio.on('export', function(channel) {
  console.log('Channel set: ' + channel);
});

gpio.on('change', function(channel, value) {
  console.log('Channel ' + channel + ' value is now ' + value);
});

gpio.setup(pin, gpio.OUT, function() {
  tone();
});

function tone() {
  var bool = true;
  setInterval(function() {
    

    gpio.write(pin, bool, function(err) {
      console.log(bool);
      if (err) throw err;
    });

    bool = !bool;
  }, 8);
}

function closePins() {
  gpio.destroy(function() {
    console.log('All pins unexported');
  });
}
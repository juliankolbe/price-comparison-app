var app = require('_/app');
var logger    = require('_/logger');
var port = process.env.PORT || 3000;

logger.info('Server process starting');

app.listen(port, function (error) {
  if (error) {
    logger.error('Unable to listen for connections', error);
    process.exit(10);
  }
  logger.info('Runnning server on port: '+port);
});


//*********************************************************
//    Quick and dirty way to detect event loop blocking
//*********************************************************
var lastLoop = Date.now();

function monitorEventLoop() {
    var time = Date.now();
    if (time - lastLoop > 1000) {
      logger.error('Event loop blocked ' + (time - lastLoop));
    }
    lastLoop = time;
    setTimeout(monitorEventLoop, 200);
}

if (process.env.NODE_ENV === 'development') {
    monitorEventLoop();
}


'use strict';

var websocket = require('..');
var abstractSession = require('jschan/test/abstract_session');

describe('websocket session', function() {

  var server;

  abstractSession(function(cb) {
    server = websocket.server();

    server.listen(0);

    var outSession;

    server.on('listening', function() {
      outSession = websocket.clientSession({
        host: server.address().host,
        port: server.address().port
      });
    });

    server.on('session', function(session) {
      cb(null, session, outSession);
    });
  });

  afterEach(function shutdownServer(done) {
    server.close(done);
  });
});

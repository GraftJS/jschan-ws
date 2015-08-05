# jschan websocket transport &nbsp;&nbsp;[![Build Status](https://travis-ci.org/GraftJS/jschan.png)](https://travis-ci.org/GraftJS/jschan)

__jschan__ is a JavaScript port of [libchan](https://github.com/docker/libchan) based around node streams

[Find out more about jschan](https://github.com/GraftJS/jschan)

## Install

```bash
npm install jschan-ws --save
```
-------------------------------------------------------
<a name="websocketClientSession"></a>
### ws.clientSession(url)

Creates a new websocket session. The url can be in the form
'ws://localhost' or passes as an object.
It is based on [`streamSession`](#streamSession).

_`ws.clientSession` is not compatible with libchan._

This method can also work in the browser thanks to
[Browserify](http://npm.im/browserify).

Example:

```js
var websocket = require('jschan-ws');
var session = websocket.clientSession('ws://localhost:3000');
var chan    = session.WriteChannel();
var ret     = chan.ReadChannel();

ret.on('data', function(res) {
  console.log(res);
  session.close();
});

chan.end({
  hello:'world',
  returnChannel: ret
});
```

-------------------------------------------------------
<a name="websocketServer"></a>
### websocket.server(options)

Creates a new websocketServer, or attach the websocket handler to the
passed-through `httpServer` object.
It is based on [`streamSession`](#streamSession).

_`websocket.server` is not compatible with libchan._

If a new http server is created, remeber to call listen, like so:

```js

'use strict';

var websocket = require('jschan-ws');
var server = websocket.server();

function handleMsg(msg) {
  var stream = msg.returnChannel;
  delete msg.returnChannel;
  stream.end(msg);
}

function handleChannel(chan) {
  chan.on('data', handleMsg);
}

function handleSession(session) {
  session.on('channel', handleChannel);
}

server.on('session', handleSession);

server.listen(3000);
```

## About LibChan

It's most unique characteristic is that it replicates the semantics of go channels across network connections, while allowing for nested channels to be transferred in messages. This would let you to do things like attach a reference to a remote file on an HTTP response, that could be opened on the client side for reading or writing.

The protocol uses SPDY as it's default transport with MSGPACK as it's default serialization format. Both are able to be switched out, with http1+websockets and protobuf fallbacks planned.
SPDY is encrypted over TLS by default.

While the RequestResponse pattern is the primary focus, Asynchronous Message Passing is still possible, due to the low level nature of the protocol.

![Graft](https://rawgit.com/GraftJS/graft.io/master/static/images/graft_logo.svg)

The Graft project is formed to explore the possibilities of a web where servers and clients are able to communicate freely through a microservices architecture.

> "instead of pretending everything is a local function even over the network (which turned out to be a bad idea), what if we did it the other way around? Pretend your components are communicating over a network even when they aren't."
> [Solomon Hykes](http://github.com/shykes) (of Docker fame) on LibChan - [[link]](https://news.ycombinator.com/item?id=7874317)

[Find out more about Graft](https://github.com/GraftJS/graft)

## Contributors

* [Adrian Rossouw](http://github.com/Vertice)
* [Peter Elger](https://github.com/pelger)
* [Matteo Collina](https://github.com/mcollina)

## License

MIT

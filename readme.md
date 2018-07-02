Sapling
=======

Sapling is an experimental Websocket framework. Inspired by Express' routing system, Sapling was designed to route Websocket requests to an appropriate handler/controller.

Sapling is still in development and misses some features. Current state is just the prototype for my own side projects. :)

# Getting Started
Add Sapling to your project using `npm i @davidrockin/sapling`

## New Projects
It's probably easier to start a new project using Sapling. Just create a new Sapling instance, and add routes as you will.

```
const Sapling = require('sapling');

let app = new Sapling({ port: 8000 });
app.use((req, res) => { ... });

// ... rest of code here ...
```

## Existing Projects
If you have an existing project with an Express Server, HTTP Server and/or Websocket Server, you can just assign their instance(s) to the options object in the Sapling constructor.

```
const Sapling = require('sapling');

let app = new Sapling({

	express: YourExpressInstance,
	http   : HTTPServerInstance,
	ws     : WebSocketServerInstance,

	// note: if you don't specify an HTTP server instance, it'll listen
	// on the port below. If an instance exist and listening, Websocket
	// server will just hook into your existing HTTP server
	port   : 8080

});

// ...
```

# Registering Routes *use([action,] handler)*
If you want to register a route that will respond to a specific action
```
app.use('example', (req, res) => { 
	...
})
```

The above will respond to a message with the **example** action

If you wish to register a default route, which will be called by order of precedence, they will receive the previous route response and can altar as it wishes.

```
app.use((req, res) => {
	...
})
```

# Registry
The registry is a simple way to access data globally, across all routes.

* Sapling.get(arg)
* Sapling.set(arg, val)
* Sapling.exists(arg)
* Sapling.unset(arg)

# Future Goals/Tasks
- [ ] A proper routing system implementation
  - [ ] Be able to properly skip routes
  - [ ] Be able to have middlewares
- [ ] Event system
	- [ ] Hook into the client join
	- [ ] Hook into client quit
	- [ ] Hook into client messages and errors
- [ ] Cross client communication
	- [ ] Find specific clients to share data
	- [ ] Broadcast to all clients

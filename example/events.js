const Sapling = require('../src/sapling').app({
	port: 8082
});

/**
 * Routes
 */

// any requests after this will get this data
Sapling.use((req,res) => {
	console.log(`${req.client.uuid} >> default`);
	res.defaultData = 'sample';
})

Sapling.use('test', (req,res) => {
	console.log(`${req.client.uuid} >> test route`);
	res.test = true
	return true;
})

Sapling.use('example', (req,res) => {
	console.log(`${req.client.uuid} >> example route`);
	res.action = 'example-response';
	res.data   = 'OK';
})

/**
 * Custom events
 */

// listen in for when a client connects
Sapling.on('clientConnect', client => {
	console.log(`New connection from ${client._socket.remoteAddress}`);

	// we could assign custom client identifiers
	client.uuid = 'example-' + new Date().getTime();

	client.sendJSON({
		action: 'testing',
		data: [ 1, 2, 3],
		isGood: false
	})
});

// listen for when a client disconnects
Sapling.on('clientClose', (client, code) => {
	console.log(`Lost connection from ${client.uuid}`);

	// could do stuff here, broadcast info, save user data etc
});

// if you're feeling crazy enough to listen for all raw client messages, you could...?
Sapling.on('clientMessage', (client, message) => {
	console.log(`Message from ${client.uuid} >> ${message}`);
});

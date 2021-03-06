const express = require('express');
const http    = require('http');
const ws      = require('ws');

/**
 * Websocket server wrapper
 */
class Server {

	constructor(sapling) {
		this.sapling = sapling;
		this.setup();
	}

	/**
	 * Gets sapling instance
	 * 
	 * @returns {Sapling}
	 */
	getSapling() {
		return this.sapling;
	}

	/**
	 * Setup our servers
	 * 
	 * An existing express, HTTP server and/or Websocket server
	 * instances can be passed when Sapling is constructed as an option
	 */
	setup() {
		this.express = this.sapling.getOpts().express || express();
		this.http    = this.sapling.getOpts().http    || http.createServer(this.express);
		this.ws      = this.sapling.getOpts().ws      || new ws.Server({ server : this.http });

		// for existing HTTP server instances, make sure we're not listening
		if (!this.http.listening) {
			this.http.listen(this.sapling.getOpts().port || 8080);
		}

		// register websocket events
		this.setupEvents();
	}

	/**
	 * Register Websocket events
	 */
	setupEvents() {
		this.ws.on('connection', this._onClientConnect.bind(this));
	}

	/**
	 * When a client connects to the websocket
	 * 
	 * @param {Client} client 
	 */
	_onClientConnect(client) {
		client.sendJSON = (data) => {
			client.send(JSON.stringify(data));
		};

		this.sapling.getEvents().emit('clientConnect', client);
		client.on('message', (str => {
			this._onClientMessage.bind(this)(str, client);
		}).bind(this));
		
		client.on('close', (code => { this._onClientClose(client, code); }).bind(this));
		client.on('error', (err  => { this._onClientError(client, err); }).bind(this));
	}

	/**
	 * When a client disconnects from the websocket
	 * 
	 * @param {Client} client 
	 */
	_onClientClose(client, code) {
		this.sapling.getEvents().emit('clientClose', client, code);
	}

	/**
	 * When a client disconnects from the websocket
	 * 
	 * @param {Client} client 
	 */
	_onClientError(client, err) {
		this.sapling.getEvents().emit('clientError', client, err);
	}

	/**
	 * When a client sends a message
	 * 
	 * @param {String} str message
	 * @param {Client} client 
	 */
	_onClientMessage(str, client) {
		this.sapling.getEvents().emit('clientMessage', client, str);
		const response = JSON.stringify(this.parseMessage(str, client));
		if (client.readyState === ws.OPEN)
			client.send(response);
		else {
			console.log(`Cannot send ${response} to client, lost connection`);
		}
	}

	/**
	 * Parses a client message, and find its route
	 * 
	 * @param {String} str message
	 * @returns {Object} object response results
	 */
	parseMessage(str, client) {
		var resp = { error: true, message: 'Invalid request made' };

		try {
			// try to parse message
			var json = JSON.parse(str);
			if (null === json || !(json instanceof Object) || !json.action) {
				return resp;
			}

			// find route bruh!
			resp = this.sapling.findRoute(json.action, {raw: json, client}).res;
		} catch (e) {
			console.log('[!] Error! ', e);
			resp.message = 'Internal server error, ' + e;
		}

		return resp;
	}

}

module.exports = Server;
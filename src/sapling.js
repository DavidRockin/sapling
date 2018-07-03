const Registry = require('./registry');
const Router   = require('./router');
const Server   = require('./server');
const EventEmitter = require('events');

/**
 * Sapling framework application
 */
class Sapling {

	constructor(opts) {
		this.opts = opts;
		this.registry = new Registry();
		this.router   = new Router(this);
		this.server   = new Server(this);
		this.events   = new EventEmitter();
	}

	/**
	 * Static constructor, incase you're lazy
	 * 
	 * @param {Object} opts options
	 * @returns {Sapling} 
	 */
	static app(opts) {
		return new Sapling(opts);
	}

	/**
	 * Returns our base options object
	 * 
	 * @returns {Object}
	 */
	getOpts() {
		return this.opts;
	}

	/**
	 * Gets the event emitter system
	 * 
	 * @returns {EventEmitter}
	 */
	getEvents() {
		return this.events;
	}

	on(eventName, handler) {
		return this.getEvents().on(eventName, handler);
	}

	use(action, handler) {
		return this.router.use(action, handler);
	}

	/**
	 * Gets the arg's data
	 * 
	 * @param {String} arg
	 * @returns {Object} null if no data, otherwise whatever the data is 
	 */
	get(arg) {
		return this.registry.get(arg);
	}

	/**
	 * Assign's an argument with its value
	 * 
	 * @param {String} arg 
	 * @param {Object} val 
	 * @returns {Registry}
	 */
	set(arg, val) {
		return this.registry.set(arg, val);
	}

	/**
	 * Removes the argument from registry
	 * 
	 * @param {String} arg 
	 * @return {Registry}
	 */
	unset(arg) {
		return this.registry.unset(arg);
	}

	/**
	 * Finds the next route
	 * 
	 * @param {String} action 
	 * @param {Object} req 
	 */
	findRoute(action, req) {
		return this.router.findRoute(action, req);
	}

}

module.exports = Sapling;
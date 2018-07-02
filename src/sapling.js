const Registry = require('./registry');

/**
 * Sapling framework application
 */
class Sapling {

	constructor(opts) {
		this.opts = opts;
		this.registry = new Registry();
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

	use(handler) {
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

}

module.exports = Sapling;
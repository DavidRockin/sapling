/**
 * Registry is an overkill way to store and reuse data
 * across all of our routes
 */
class Registry {

	constructor() {
		this.data = [];
	}

	static app() {
		return new Registry();
	}

	/**
	 * Checks to see if a parameter is defined
	 * 
	 * @param {String} arg
	 * @returns {Boolean} true if arg exists, false otherwises
	 */
	exists(arg) {
		return this.data[arg] && this.data[arg] !== null;
	}

	/**
	 * Gets the arg's data
	 * 
	 * @param {String} arg
	 * @returns {Object} null if no data, otherwise whatever the data is 
	 */
	get(arg) {
		return this.exists(arg) ? this.data[arg] : null;
	}

	/**
	 * Assign's an argument with its value
	 * 
	 * @param {String} arg 
	 * @param {Object} val 
	 * @returns {Registry}
	 */
	set(arg, val) {
		this.data[arg] = val;
		return this;
	}

	/**
	 * Removes the argument from registry
	 * 
	 * @param {String} arg 
	 * @return {Registry}
	 */
	unset(arg) {
		if (this.exists(arg))
			delete this.data[arg];
		return this;
	}

	/**
	 * Merges an object into the registry
	 * 
	 * @param {Object} object 
	 * @todo
	 */
	mergeObject(object) {
		// ...
	}

}

module.exports = Registry;
/**
 * Sapling framework application
 */
class Sapling {

	constructor(opts) {
		this.opts = opts;
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

	get(arg) {
	}

	set(arg, val) {
	}

	unset(arg) {
	}

}

module.exports = Sapling;
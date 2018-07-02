/**
 * Router will try its best to serve request to routes
 */
class Router {

	constructor(sapling) {
		this.sapling = sapling;
		this.routes = [];
	}

	/**
	 * Registers a new route
	 * 
	 * @param {String|Object} action String if the action is known, otherwise object to be handled by all routes 
	 * @param {Object} handler The route callback
	 */
	use(action, handler) {
		let route = { handler: action};
		if (handler) {
			route.action = action;
			route.handler = handler;
		}
		this.routes.push(route);
	}

	/**
	 * Attempts to find a route by its action
	 * 
	 * @param {String} action Name of action
	 * @param {Object} req Request data
	 * @returns {Object} bunch of garbage really
	 */
	findRoute(action, req) {
		var action = action.trim();
		var result, res = {}, req = req || {};
		req.action = action;
		req.router = this;
		req.sapling = this.sapling;
		this.routes.forEach((route, index) => {
			if ((route.action && route.action === action) || (!route.action && result !== true))
			result = route.handler(req, res);
		})
		return { result, req, res };
	}

}

module.exports = Router;
'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
	profiles = require('../../app/controllers/profiles');

module.exports = function(app) {
	// Profile Routes
	app.route('/profiles')
		.get(profiles.list)
		.post(users.requiresLogin, profiles.create);

	app.route('/profiles/:profileId')
		.get(profiles.read)
		.put(users.requiresLogin, profiles.hasAuthorization, profiles.update)
		.delete(users.requiresLogin, profiles.hasAuthorization, profiles.delete);

	// Finish by binding the profile middleware
	app.param('profileId', profiles.profileByID);
};
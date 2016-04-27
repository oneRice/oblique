/* global angular */
(function () {
	"use strict";

	angular.module('__MODULE__.common')
		.factory('AuthService', function ($http, $q, $auth) {
			var service = {};

			service.context = {
				user: null,
				roles: []
			};

			service.init = function(user, roles) {
				service.context.user = user;
				service.context.roles = roles || [];
				return user;
			};

			service.destroy = function () {
				service.context.user = null;
				service.context.roles = [];
			};

			service.resolve = function() {
				// TODO: replace with your own user resolution implementation here!
				return $http.api.get('/me', {silent: true}).then(function(user) {
					return service.init(user, user.roles);
				});
			};

			service.login = function (credentials) {
				// TODO: replace with your own login implementation here!
				// Make this a background request (TODO: redesign blocking/silent/background operations):
				credentials.background = true;
				return $auth.login(credentials).then(function(response){
					return service.resolve();
				});
			};

			service.logout = function () {
				// TODO: replace with your own logout implementation here!
				return $auth.logout().then(function () {
					return service.destroy();
				});
			};

			service.register = function (user) {
				// TODO: replace with your own registration implementation here, if any!
				return $auth.signup(user).then(function(response) {
					if(response.data && response.data.token) {
						$auth.setToken(response.data.token);
						return service.resolve(user);
					} else {
						return $q.reject('No authentication token returned!');
					}
				});
			};

			service.isAuthenticated = function () {
				// TODO: replace with your own authentication implementation here!
				return service.context.user && $auth.isAuthenticated();
			};

			service.isAuthorized = function (roles) {
				// TODO: replace with your own authorization implementation here!
				return service.isAuthenticated() && service.hasRoles(roles);
			};

			service.hasRoles = function (roles) {
				// TODO: replace with your own roles authorization implementation here!
				if (!angular.isArray(roles)) {
					roles = [roles];
				}
				return _.intersection(service.context.roles, roles).length > 0;
			};

			return service;
		});
}());
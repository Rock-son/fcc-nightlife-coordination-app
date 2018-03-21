"use strict";

import { LOGIN, LOGOUT, SEARCH } from "StateVariables";
/**
 * Auth action creater
*/
export default {

	loginUser: function() { 
		return {
			type: LOGIN
		};
	},

	logoutUser: function(user) { 
		return {
			type: LOGOUT,
			user   
		};
	},

	searchLocation: function(location) { 
		return {
			type: SEARCH,
			location
		};
	}
};
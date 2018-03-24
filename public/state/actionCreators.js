"use strict";

import { LOGIN, LOGOUT, SEARCH } from "StateVariables";
/**
 * Auth action creater
*/
export default {

	DISPATCH_LOGIN_ACTION: function() { 
		return {
			type: LOGIN
		};
	},

	DISPATCH_LOGOUT_ACTION: function(user) { 
		return {
			type: LOGOUT,
			user   
		};
	},

	DISPATCH_SEARCH_ACTION: function(location) { 
		return {
			type: SEARCH,
			location
		};
	}
};
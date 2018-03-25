"use strict";

import axios from "axios";

export default {
	LOGIN: "login",
	LOGOUT: "logout",
	SEARCH: "search",
	INITIAL_AUTH: { authenticated: false },
	INITIAL_SEARCH_RESULTS: { results: "dela"},
	GET_BARS_ON_LOCATION: function(location) {
		
		axios({
			method: "post",
			url: "/api/searchBars",
			data: {
				location
			},
			validateStatus: function (status) {
				return status < 500; // Reject only if the status code is greater than or equal to 500
			}
		})
			.then(response => {
				console.log(response);
				return response.data;
			})
			.catch(error => {
				if (error.response) {
					// The request was made and the server responded with a status code
					// that falls out of the range of 2xx
					return [error.response.data, error.response.status, error.response.header];
				} else if (error.request) {
					// The request was made but no response was received
					// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
					// http.ClientRequest in node.js
					return error.request;
				} else {
					// Something happened in setting up the request that triggered an Error
					return error.message;
				}
			});
	}
};

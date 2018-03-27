"use strict";

import axios from "axios";

export default {
	LOGIN: "login",
	LOGOUT: "logout",
	SEARCH: "search",
	INITIAL_AUTH: { authenticated: false },
	INITIAL_BARS: { results: process.env.NODE_ENV },
	GET_BARS_ON_LOCATION: (location) => {
		axios({
			method: "post",
			url: "/api/searchBars",
			data: {
				location
			},
			validateStatus: status => status < 500 // Reject if the status code < 500
		})
			.then((response) => {
				console.log(response);
				return response.data;
			})
			.catch((error) => {
				if (error.response) {
					// The request was made and the server responded with a status code
					// that falls out of the range of 2xx
					return [error.response.data, error.response.status, error.response.header];
				}
				if (error.request) {
					// The request was made but no response was received
					// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
					// http.ClientRequest in node.js
					return error.request;
				}
				return error.message;
			});
	}
};

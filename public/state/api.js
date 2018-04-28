"use strict";

import axios from "axios";

const validateStatus = () => status => status < 500; // Reject if the status is > 500

export default {
	getBarsOnLocation: location =>
		axios({
			method: "post",
			url: "api/searchBars",
			data: {
				location
			},
			headers: {
				"Content-Type": "application/json"
			},
			validateStatus
		}),
	addGoingUsers: (location, id, user) =>
		axios({
			method: "post",
			url: "api/addGoing",
			data: {
				location,
				id,
				user
			},
			headers: {
				"Content-Type": "application/json"
			},
			validateStatus
		}),
	removeGoingUsers: (location, id, user) =>
		axios({
			method: "post",
			url: "api/removeGoing",
			data: {
				location,
				id,
				user
			},
			headers: {
				"Content-Type": "application/json"
			},
			validateStatus
		}),
	initializeLocation: () =>
		axios({
			method: "post",
			url: "api/initializeLocation",
			headers: {
				"Content-Type": "application/json"
			},
			validateStatus
		}),
	login: type =>
		axios({
			method: "post",
			url: "api/authenticate",
			headers: {
				"Content-Type": "application/json"
			},
			data: {
				type
			},
			validateStatus
		})
};

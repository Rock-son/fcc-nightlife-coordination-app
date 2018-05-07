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
			url: `api/addGoing`,
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
			url: `api/removeGoing`,
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
			url: `api/initializeLocation`,
			headers: {
				"Content-Type": "application/json"
			},
			validateStatus
		}),
	login: data =>
		axios({
			method: "post",
			url: `auth/${data.type}`,
			headers: {
				"Content-Type": "application/json"
			},
			validateStatus
		}),
	localLogin: data =>
		axios({
			method: "post",
			url: `auth/localAuth`,
			headers: {
				"Content-Type": "application/json"
			},
			data: {
				username: data.user || null,
				password: data.pass || null
			},
			validateStatus
		}),
	getLoggedUser: () =>
		axios({
			method: "post",
			url: `auth/getLoggedUser`,
			headers: {
				"Content-Type": "application/json"
			},
			validateStatus
		}),
	register: data =>
		axios({
			method: "post",
			url: `auth/register`,
			headers: {
				"Content-Type": "application/json"
			},
			data: {
				username: data.user || null,
				password: data.pass1 || null,
				confirmPassword: data.pass2 || null
			},
			validateStatus
		}),
	logout: () =>
		axios({
			method: "post",
			url: `auth/logout`,
			headers: {
				"Content-Type": "application/json"
			},
			validateStatus
		}),
};

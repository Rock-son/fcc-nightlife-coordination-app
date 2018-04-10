"use strict";

import React from "react";
import PropTypes from "prop-types";
import { LOGIN, LOGOUT } from "Actions";


export default class Navbar extends React.PureComponent {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		switch (e.target.id) {
		case LOGIN:
			this.props.login();
			break;
		case LOGOUT:
			this.props.logout();
			break;
		default:
			break;
		}
	}

	render() {
		return (
			<div className="navbar">
				<div className="navbar__left">
					<i className="fa fa-home" title="Home" />
				</div>
				<div className="navbar__right">
					<button id="login" tabIndex="0" onClick={this.handleClick} style={{ display: this.props.auth.authenticated ? "none" : "inline-block" }} className="navbar__right__login">Sign In</button>
					<button id="logout" tabIndex="0" onClick={this.handleClick} style={{ display: this.props.auth.authenticated ? "inline-block" : "none" }} className="navbar__right__login">Logout</button>
					<a id="user" href="https://twitter.com/settings/applications" tabIndex="0" onClick={this.handleClick} style={{ display: this.props.auth.authenticated ? "inline-block" : "none" }} className="navbar__right__login">Welcome, Rok</a>
				</div>
			</div>
		);
	}
}

Navbar.propTypes = {
	login: PropTypes.func,
	logout: PropTypes.func,
	auth: PropTypes.instanceOf(Object),
	authenticated: PropTypes.bool
};

Navbar.defaultProps = {

	login: () => true,
	logout: () => true,
	auth: { authenticated: false },
	authenticated: false
};

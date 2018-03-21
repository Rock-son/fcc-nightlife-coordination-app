"use strict";

import React from "react";
import PropTypes from "prop-types";
import { LOGIN, LOGOUT } from "StateVariables";


export class Navbar extends React.Component {
	constructor(props) {
		super(props);
		this._handleClick = this._handleClick.bind(this);
	}

	_handleClick(e) {
		
		switch(e.target.id) {
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
		const isAuth = this.props.auth;

		return (
			<div className="navbar">
				<div className="navbar__left">
					<i className="fa fa-home" title="Home"></i>
				</div>
				<div className="navbar__right">
					<div id="login"  onClick={this._handleClick} style={{display: isAuth ? "none" : "inline-block"}} className="navbar__right__login">Sign In</div>
					<div id="logout" onClick={this._handleClick} style={{display: isAuth ? "inline-block" : "none"}} className="navbar__right__login">Logout</div>
					<div id="user"   onClick={this._handleClick} style={{display: isAuth ? "inline-block" : "none"}} className="navbar__right__login">Welcome, Rok</div>
				</div>  
			</div>
		);
	}
}

Navbar.propTypes = {

	login: PropTypes.func,
	logout: PropTypes.func,
	state: PropTypes.object,
	authorised: PropTypes.bool,
	auth: PropTypes.object
};

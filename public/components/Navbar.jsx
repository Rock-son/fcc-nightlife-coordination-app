"use strict";

import React from "react";
import PropTypes from "prop-types";

const LOGIN = "login";
const LOGOUT = "logout";

export class Navbar extends React.Component {
	constructor(props) {
		super(props);
		this._handleClick = this._handleClick.bind(this);
	}

	_handleClick(e) {
		
		switch(e.target.id) {
		case LOGIN:			
			this.props.state._login();
			break;
		case LOGOUT:
			this.props.state._logout();
			break;
		default:
			break;
		}	
	}

	render() {
		const isAuth = this.props.state.auth.authenticated;

		return (
			<div className="navbar">
				<div className="navbar__left">
					<i className="fa fa-home" title="Home"></i>
					<div>{this.props.authorised}</div>
				</div>
				<div className="navbar__right">
					<div id="login"  onClick={this._handleClick} style={{display: isAuth ? "none" : "inline-block"}} className="navbar__right__login">Login</div>
					<div id="logout" onClick={this._handleClick} style={{display: isAuth ? "inline-block" : "none"}} className="navbar__right__login">Logout</div>
					<div id="user"   onClick={this._handleClick} style={{display: isAuth ? "inline-block" : "none"}} className="navbar__right__login">Welcome, Rok</div>
				</div>  
			</div>
		);
	}
}

Navbar.propTypes = {

	_login: PropTypes.func,
	_logout: PropTypes.func,
	state: PropTypes.object,
	authorised: PropTypes.bool,
	auth: PropTypes.object
};

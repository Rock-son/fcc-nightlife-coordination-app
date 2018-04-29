"use strict";

import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { LOGIN, LOGOUT } from "Actions";

const GOOGLE = "google";
const FACEBOOK = "facebook";
const GITHUB = "github";
const TWEETER = "tweeter";
const LOCAL = "local";
const REGISTER = "register";

export default class Navbar extends React.PureComponent {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		switch (e.target.id) {
		case LOGIN:
			this.props.openLoginDialog(!this.props.authState.openDialog);
			break;
		case GOOGLE:
			this.props.login(GOOGLE);
			break;
		case FACEBOOK:
			this.props.login(FACEBOOK);
			break;
		case GITHUB:
			this.props.login(GITHUB);
			break;
		case TWEETER:
			this.props.login(TWEETER);
			break;
		// ADD ROUTING TO LOGIN
		case LOCAL:
			this.props.login(LOCAL);
			break;
		// ADD ROUTING TO REGISTER
		case REGISTER:
			this.props.login(LOCAL);
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
					<button id="login" tabIndex="0" onClick={this.handleClick} style={{ display: this.props.authState.authenticated ? "none" : "inline-block" }} className="navbar__right__login">{this.props.authState.openDialog ? "Close" : "Sign In" }</button>
					<button id="logout" tabIndex="0" onClick={this.handleClick} style={{ display: this.props.authState.authenticated ? "inline-block" : "none" }} className="navbar__right__login">Logout</button>
					<a id="user" href="https://twitter.com/settings/applications" tabIndex="0" onClick={this.handleClick} style={{ display: this.props.authState.authenticated ? "inline-block" : "none" }} className="navbar__right__login">Welcome, Rok</a>
				</div>
				<div className="navbar__login-dialog" style={{ display: this.props.authState.openDialog ? "block" : "none" }} >
					<h2 className="navbar__login-dialog__header">Sign In</h2>
					<button id="facebook" className="navbar__login-dialog__btn facebook" onClick={this.handleClick} >
						<div className="navbar__login-dialog__btn__container">
							<i className="fa fa-facebook-square" />  Facebook
						</div>
					</button>
					<button id="google" className="navbar__login-dialog__btn google" onClick={this.handleClick} >
						<div className="navbar__login-dialog__btn__container">
							<i className="fa fa-google-plus-square" /> Google
						</div>
					</button>
					<button id="github" className="navbar__login-dialog__btn github" onClick={this.handleClick} >
						<div className="navbar__login-dialog__btn__container">
							<i className="fa fa-github-square" /> Github
						</div>
					</button>
					<button id="twitter" className="navbar__login-dialog__btn twitter" onClick={this.handleClick} >
						<div className="navbar__login-dialog__btn__container">
							<i className="fa fa-twitter-square" /> Twitter
						</div>
					</button>
					<hr className="navbar__login-dialog__line" />
					<div className="navbar__login-dialog__footer">
						<Link id="signin" className="navbar__login-dialog__footer__link" to="/signin">Sign In</Link>
						<span> | </span>
						<Link id="signup" className="navbar__login-dialog__footer__link" to="/signup">Sign Up</Link>
					</div>
				</div>
			</div>
		);
	}
}

Navbar.propTypes = {
	// STATE
	authState: PropTypes.instanceOf(Object).isRequired,
	// FUNCTIONS
	openLoginDialog: PropTypes.func.isRequired,
	login: PropTypes.func,
	logout: PropTypes.func
};

Navbar.defaultProps = {

	login: () => true,
	logout: () => true
};

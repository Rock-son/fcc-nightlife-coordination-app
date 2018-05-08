"use strict";

import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { LOGIN, LOGOUT } from "Actions";

const GOOGLE = "google";
const FACEBOOK = "facebook";
const GITHUB = "github";
const LOCAL = "local";
const SIGNIN = "signin";
const SIGNUP = "signup";

const SETTINGS_URL = {
	[LOCAL]: "/",
	[GOOGLE]: "https://myaccount.google.com/permissions",
	[GITHUB]: "https://github.com/settings/applications",
	[FACEBOOK]: "https://www.facebook.com/settings?tab=applications"
};


export default class Navbar extends React.PureComponent {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.onMouseEnter = this.onMouseEnter.bind(this);
	}

	onMouseEnter(e) {
		if (!this.props.authState.openDialog) {
			this.props.openLoginDialog(true);
		}
	}

	handleClick(e) {
		switch (e.target.id || e.target.parentNode.id || e.target.parentNode.parentNode.id) {
		case LOGIN:
		case SIGNIN:
		case SIGNUP:
			this.props.openLoginDialog(!this.props.authState.openDialog);
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
					<Link to="/">
						<i className="fa fa-home" title="Home" />
					</Link>
				</div>
				<div className="navbar__right">
					<button id={LOGIN} tabIndex="0" onClick={this.handleClick} onMouseEnter={this.onMouseEnter} style={{ display: this.props.authState.authenticated ? "none" : "inherit" }} className="navbar__right__login">{this.props.authState.openDialog ? "Close" : "Sign In" }</button>
					<button id={LOGOUT} tabIndex="0" onClick={this.handleClick} style={{ display: this.props.authState.authenticated ? "inherit" : "none" }} className="navbar__right__login">Logout</button>
					<a id="user" href={this.props.authState.authType ? SETTINGS_URL[this.props.authState.authType] : "/"} tabIndex="0" onClick={this.handleClick} style={{ display: this.props.authState.authenticated ? "inherit" : "none" }} className="navbar__right__user" target="_blank" rel="noreferrer noopener" >{`Welcome, ${this.props.authState.user}`}</a>
				</div>
				<div className="navbar__login-dialog" style={{ display: this.props.authState.openDialog ? "block" : "none" }} >
					<h2 className="navbar__login-dialog__header">Sign in</h2>
					<a id={FACEBOOK} className="navbar__login-dialog__btn facebook" href={`/auth/${FACEBOOK}`} >
						<div className="navbar__login-dialog__btn__container">
							<i className="fa fa-facebook-square" />  Facebook
						</div>
					</a>
					<a id={GOOGLE} className="navbar__login-dialog__btn google" href={`/auth/${GOOGLE}`} >
						<div className="navbar__login-dialog__btn__container">
							<i className="fa fa-google-plus-square" /> Google
						</div>
					</a>
					<a id={GITHUB} className="navbar__login-dialog__btn github" href={`/auth/${GITHUB}`} >
						<div className="navbar__login-dialog__btn__container">
							<i className="fa fa-github-square" /> Github
						</div>
					</a>
					<hr className="navbar__login-dialog__line" />
					<div className="navbar__login-dialog__footer">
						<Link id={SIGNIN} to={`/${SIGNIN}`} onClick={this.handleClick} className="navbar__login-dialog__footer__link" >Sign In</Link>
						<span> | </span>
						<Link id={SIGNUP} to={`/${SIGNUP}`} onClick={this.handleClick} className="navbar__login-dialog__footer__link" >Sign Up</Link>
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
	logout: PropTypes.func
};

Navbar.defaultProps = {
	logout: () => true
};

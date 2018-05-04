"use strict";

import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { LOGIN, LOGOUT } from "Actions";

const GOOGLE = "google";
const FACEBOOK = "facebook";
const GITHUB = "github";
const TWITTER = "twitter";
const SIGNIN = "signin";
const SIGNUP = "signup";


export default class Navbar extends React.PureComponent {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
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
		case GOOGLE:
			this.props.login({ type: GOOGLE });
			break;
		case FACEBOOK:
			this.props.login({ type: FACEBOOK });
			break;
		case GITHUB:
			this.props.login({ type: GITHUB });
			break;
		case TWITTER:
			this.props.login({ type: TWITTER });
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
					<button id={LOGIN} tabIndex="0" onClick={this.handleClick} style={{ display: this.props.authState.authenticated ? "none" : "inline-block" }} className="navbar__right__login">{this.props.authState.openDialog ? "Close" : "Sign In" }</button>
					<button id={LOGOUT} tabIndex="0" onClick={this.handleClick} style={{ display: this.props.authState.authenticated ? "inline-block" : "none" }} className="navbar__right__login">Logout</button>
					<a id="user" href="https://twitter.com/settings/applications" tabIndex="0" onClick={this.handleClick} style={{ display: this.props.authState.authenticated ? "inline-block" : "none" }} className="navbar__right__login">{`Welcome, ${this.props.authState.user}`}</a>
				</div>
				<div className="navbar__login-dialog" style={{ display: this.props.authState.openDialog ? "block" : "none" }} >
					<h2 className="navbar__login-dialog__header">Sign In</h2>
					<button id={FACEBOOK} className="navbar__login-dialog__btn facebook" onClick={this.handleClick} >
						<div className="navbar__login-dialog__btn__container">
							<i className="fa fa-facebook-square" />  Facebook
						</div>
					</button>
					<button id={GOOGLE} className="navbar__login-dialog__btn google" onClick={this.handleClick} >
						<div className="navbar__login-dialog__btn__container">
							<i className="fa fa-google-plus-square" /> Google
						</div>
					</button>
					<button id={GITHUB} className="navbar__login-dialog__btn github" onClick={this.handleClick} >
						<div className="navbar__login-dialog__btn__container">
							<i className="fa fa-github-square" /> Github
						</div>
					</button>
					<button id={TWITTER} className="navbar__login-dialog__btn twitter" onClick={this.handleClick} >
						<div className="navbar__login-dialog__btn__container">
							<i className="fa fa-twitter-square" /> Twitter
						</div>
					</button>
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
	login: PropTypes.func,
	logout: PropTypes.func
};

Navbar.defaultProps = {

	login: () => {},
	logout: () => true
};

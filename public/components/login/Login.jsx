"use strict";

import React from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import PropTypes from "prop-types";

const SIGNIN = "signin";
const SIGNUP = "signup";
const USER = "user";
const PASS1 = "pass1";
const PASS2 = "pass2";

export default class Login extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = { [USER]: "", [PASS1]: "", [PASS2]: "" };
		this.username = React.createRef();

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleLinks = this.handleLinks.bind(this);
	}

	componentDidMount() {
		this.username.current.focus();
	}

	handleLinks(e) {
		switch (e.target.id) {
		case SIGNIN:
			this.props.isRegistering(false);
			this.username.current.focus();
			break;
		case SIGNUP:
			this.props.isRegistering(true);
			this.username.current.focus();
			break;
		default:
			break;
		}
	}

	handleChange(e) {
		e.preventDefault();
		switch (e.target.id) {
		case USER:
			this.setState({ [USER]: e.target.value });
			break;
		case PASS1:
			this.setState({ [PASS1]: e.target.value });
			break;
		case PASS2:
			this.setState({ [PASS2]: e.target.value });
			break;
		default:
			break;
		}
	}
	handleSubmit(e) {
		e.preventDefault();
		if (this.state[PASS2]) {
			this.props.register({ user: this.state[USER], pass1: this.state[PASS1], pass2: this.state[PASS2] });
			return;
		}
		this.props.localLogin({ user: this.state[USER], pass: this.state[PASS1] });
	}

	render() {
		if (this.props.authState.redirect) { return <Redirect to="/" />; }
		return (
			<section className="context">
				<div className="form__container">
					<h1 className="form__container__title">{this.props.authState.register ? "Sign Up" : "Sign In" }</h1>
					{/* CONFIRM PASSWORD */}
					{ this.props.authState.register ?
						<h5 className="form__container__subtitle">Please fill out the Form</h5> :
						<h5 className="form__container__subtitle">Please fill in the Login Data</h5>
					}
					<hr className="form__container__line" />
					<form className="form" onSubmit={this.handleSubmit}>
						<input id={USER} className="form__control" type="text" ref={this.username} onChange={this.handleChange} value={this.state[USER]} name="user" placeholder="Username" />
						<input id={PASS1} className="form__control" type="password" onChange={this.handleChange} value={this.state[PASS1]} name="password" placeholder="Password" />
						{/* CONFIRM PASSWORD */}
						{ this.props.authState.register ? <input id={PASS2} className="form__control" type="password" onChange={this.handleChange} value={this.state[PASS2]} name="confirmPassword" placeholder="Confirm Password" /> : undefined }
						{/* REGISTER OR LOGIN */}
						<input id={this.props.authState.register ? "register" : "login"} type="submit" className="form__control form__submit" value={this.props.authState.register ? "Register" : "Login"} />
					</form>
					{/* LINKS */}
					<Link id={this.props.authState.register ? SIGNIN : SIGNUP} to={this.props.authState.register ? `/${SIGNIN}` : `/${SIGNUP}`} onClick={this.handleLinks} className="form__container__footnote" >{this.props.authState.register ? "Sign In?" : "Sign Up?"}</Link>
					<div style={{ color: "red", margin: "1% auto" }}>{this.props.authState.error}</div>
				</div>
			</section>
		);
	}
}


Login.propTypes = {
	authState: PropTypes.instanceOf(Object).isRequired,
	isRegistering: PropTypes.func.isRequired,
	localLogin: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired
};

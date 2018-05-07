"use strict";

import React from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import PropTypes from "prop-types";

const SIGNUP = "signup";
const USER = "user";
const PASS = "pass";

export default class Login extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = { [USER]: "", [PASS]: "" };
		this.username = React.createRef();

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.eraseError = this.eraseError.bind(this);
	}

	componentDidMount() {
		this.username.current.focus();
	}
	eraseError() {
		this.props.openLoginDialog(false);
	}
	handleChange(e) {
		e.preventDefault();
		switch (e.target.id) {
		case USER:
			this.setState({ [USER]: e.target.value });
			break;
		case PASS:
			this.setState({ [PASS]: e.target.value });
			break;
		default:
			break;
		}
	}
	handleSubmit(e) {
		e.preventDefault();
		this.props.openLoginDialog(false);
		this.props.localLogin({ user: this.state[USER], pass: this.state[PASS] });
	}

	render() {
		if (this.props.authState.redirect) { return <Redirect to="/" />; }
		return (
			<section className="context">
				<div className="form__container">
					<h1 className="form__container__title">{this.props.authState.register ? "Sign Up" : "Sign In" }</h1>
					<h5 className="form__container__subtitle">Please fill in the Login Data</h5>
					<hr className="form__container__line" />
					<form className="form" onSubmit={this.handleSubmit}>
						<input id={USER} className="form__control" type="text" ref={this.username} onChange={this.handleChange} value={this.state[USER]} name="user" placeholder="Username" />
						<input id={PASS} className="form__control" type="password" onChange={this.handleChange} value={this.state[PASS]} name="password" placeholder="Password" />
						<input type="submit" className="form__control form__submit" value="Login" />
					</form>
					<div className="form__container__footnote" >
						<div className="form__container__footnote__txt">Don`t have an account?</div>
						<Link id={SIGNUP} to={`/${SIGNUP}`} className="form__container__footnote__link" onClick={this.eraseError} >Sign Up</Link>
					</div>
					<div className={`form__container__error ${this.props.authState.error ? "active" : ""}`} >{this.props.authState.error ? `Error: "${this.props.authState.error}"` : ""}</div>
				</div>
			</section>
		);
	}
}


Login.propTypes = {
	authState: PropTypes.instanceOf(Object).isRequired,
	localLogin: PropTypes.func.isRequired,
	openLoginDialog: PropTypes.func.isRequired
};

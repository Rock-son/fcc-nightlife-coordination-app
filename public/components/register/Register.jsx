"use strict";

import React from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import PropTypes from "prop-types";

const SIGNIN = "signin";
const USER = "user";
const PASS1 = "pass1";
const PASS2 = "pass2";

export default class Register extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = { [USER]: "", [PASS1]: "", [PASS2]: "" };
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
		this.props.openLoginDialog(false);
		this.props.register({ user: this.state[USER], pass1: this.state[PASS1], pass2: this.state[PASS2] });
	}

	render() {
		if (this.props.authState.redirect) { return <Redirect to="/" />; }
		return (
			<section className="context">
				<div className="form__container">
					<h1 className="form__container__title">Sign Up</h1>
					<h5 className="form__container__subtitle">Please fill out the Form</h5>
					<hr className="form__container__line" />
					<form className="form" onSubmit={this.handleSubmit}>
						<input id={USER} className="form__control" type="text" ref={this.username} onChange={this.handleChange} value={this.state[USER]} name="user" placeholder="Username" />
						<input id={PASS1} className="form__control" type="password" onChange={this.handleChange} value={this.state[PASS1]} name="password" placeholder="Password" />
						<input id={PASS2} className="form__control" type="password" onChange={this.handleChange} value={this.state[PASS2]} name="confirmPassword" placeholder="Confirm Password" />
						<input type="submit" className="form__control form__submit" value="Register" />
					</form>
					<div className="form__container__footnote" >
						<div className="form__container__footnote__txt">Already have an account?</div>
						<Link id={SIGNIN} to={`/${SIGNIN}`} className="form__container__footnote__link" onClick={this.eraseError} >Sign In</Link>
					</div>
					<div className={`form__container__error ${this.props.authState.error ? "active" : ""}`} >{this.props.authState.error ? `Error: "${this.props.authState.error}"` : ""}</div>
				</div>
			</section>
		);
	}
}


Register.propTypes = {
	authState: PropTypes.instanceOf(Object).isRequired,
	register: PropTypes.func.isRequired,
	openLoginDialog: PropTypes.func.isRequired
};

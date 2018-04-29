"use strict";

import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { LOGIN, REGISTER } from "Actions";

const SIGNIN = "signin";
const SIGNUP = "signup";

export default class Login extends React.PureComponent {
	constructor(props) {
		super(props);
		this.user = React.createRef();
		this.pass1 = React.createRef();
		this.pass2 = React.createRef();

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleLinks = this.handleLinks.bind(this);
	}

	componentDidMount() {
		this.user.current.focus();
	}

	handleLinks(e) {
		switch (e.target.id) {
		case SIGNIN:
			this.props.isRegistering(false);
			break;
		case SIGNUP:
			this.props.isRegistering(true);
			break;
		default:
			break;
		}
	}

	handleSubmit(e) {
		e.preventDefault();

		switch (e.target.id) {
		case LOGIN:
			this.props.login({ type: "local", user: this.user.current.value, pass: this.pass1.current.value });
			break;
		case REGISTER:
			this.props.register({ user: this.user.current.value, pass1: this.pass1.current.value, pass2: this.pass2.current.value });
			break;
		default:
			break;
		}
	}

	render() {
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
					<div className="form">
						<input className="form__control" type="text" ref={this.user} name="username" placeholder="Username" />
						<input className="form__control" type="password" ref={this.pass1} name="password" placeholder="Password" />
						{/* CONFIRM PASSWORD */}
						{ this.props.authState.register ? <input className="form__control" type="password" ref={this.pass2} name="confirmPassword" placeholder="Confirm Password" /> : undefined }
						{/* REGISTER OR LOGIN */}
						{ this.props.authState.register ?
							<input id="register" onClick={this.handleSubmit} className="form__control form__submit" type="button" value="Register" /> :
							<input id="login" onClick={this.handleSubmit} className="form__control form__submit" type="button" value="Login" />
						}
						{/* LINKS */}
						{ this.props.authState.register ?
							<Link id={SIGNIN} to={`/${SIGNIN}`} onClick={this.handleLinks} className="form__container__footnote" >Sign In?</Link> :
							<Link id={SIGNUP} to={`/${SIGNUP}`} onClick={this.handleLinks} className="form__container__footnote" >Sign Up?</Link>
						}

					</div>
				</div>
			</section>
		);
	}
}


Login.propTypes = {
	authState: PropTypes.instanceOf(Object).isRequired,
	isRegistering: PropTypes.func.isRequired,
	login: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired
};

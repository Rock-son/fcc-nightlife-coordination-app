"use strict";

import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import Card from "./_Card";

const defaultObj = {};
const defaultArray = [];

export default class Content extends React.Component {
	static handleClick(e) {
		e.target.select();
	}

	constructor(props) {
		super(props);
		this.inputField = React.createRef();
		this.searchBtn = React.createRef();

		this.handleEnterPress = this.handleEnterPress.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		this.props.renderLocation();
		setTimeout(
			() => {
				if (this.inputField) {
					this.inputField.current.click();
				}
			},
			500
		);
	}

	handleEnterPress(e) {
		if (e.keyCode === 13) {
			this.searchBtn.current.click();
		}
	}

	handleSearch(e) {
		e.preventDefault();
		this.props.search(this.props.barState.inputSrc);
	}

	handleClick(e) {
		e.preventDefault();
		this.constructor.handleClick(e);
	}

	handleInput(e) {
		e.preventDefault();
		this.props.locationInput(e.target.value);
	}

	render() {
		if (this.props.goState.errorMsg === "unauthorized") {
			this.props.openLoginDialog(true);
			this.props.goingReset();
			return <Redirect to="/signin" />;
		}
		const responseImg = "./assets/images/pexels-photo-260920.jpeg 640w, ./assets/images/pexels-photo-260921.jpeg 1280w, ./assets/images/pexels-photo-260922.jpeg 1920w";

		return (
			<section className="content">
				<img className="content__hero" srcSet={responseImg} alt="barcle" />
				<article className="content__search">
					<h2 className="content__search__header">Ready for a party night out?</h2>
					<div className="content__search__img-container">
						<i className="fa fa-thumbs-up content__search__img-container__img" />
						<i className="fa fa-glass content__search__img-container__img" />
						<i className="fa fa-coffee content__search__img-container__img" />
						<i className="fa fa-beer content__search__img-container__img" />
					</div>
					<div className="content__search__input-container">
						<input type="text" ref={this.inputField} className="content__search__input-container__input" name="location" size="50" value={this.props.barState.inputSrc} onClick={this.handleClick} onChange={this.handleInput} onKeyUp={this.handleEnterPress} placeholder="Where are you at?" />
						<button type="button" ref={this.searchBtn} className="content__search__input-container__button" onClick={this.handleSearch} >
							{this.props.barState.isFetchingBusinesses ? (<i className="fa fa-spinner fa-spin content__search__input-container__spinner" />) : "Search"}
						</button>
					</div>
					<a className="content__search__foursquare" href="https://foursquare.com/" target="_blank" rel="noreferrer noopener" >Powered by{" "}
						<i className="fa fa-foursquare" >OURSQUARE</i>
					</a>
				</article>
				<article className="content__cards">
					{/* ******************************************************* SEARCH RESULTS ********************************************************* */}
					{(this.props.error || this.props.barState.errorFetching) ?
						(<h2 className="content__cards__error">{`There was an error (${this.props.barState.errorMsg}), please try again later!`}</h2>) :

						(this.props.barState.businesses.map(business =>
							(<Card
								key={business.venue.id}
								business={business}
								handleGoing={this.handleGoing}
								barObj={this.props.goState.bars ? this.props.goState.bars[(this.props.goState.bars || defaultArray).map(e => (e ? ((e || defaultObj).bar || defaultObj).id : "")).indexOf(business.venue.id)] : defaultObj}
								authState={this.props.authState}
								openLoginDialog={this.props.openLoginDialog}
								goState={this.props.goState}
								going={this.props.going}
								notGoing={this.props.notGoing}
							/>)))
					}
				</article>
			</section>
		);
	}
}

Content.propTypes = {
	// STATES
	authState: PropTypes.instanceOf(Object).isRequired,
	barState: PropTypes.instanceOf(Object).isRequired,
	goState: PropTypes.instanceOf(Object).isRequired,
	// ACTIONS
	openLoginDialog: PropTypes.func.isRequired,
	search: PropTypes.func.isRequired,
	renderLocation: PropTypes.func.isRequired,
	locationInput: PropTypes.func.isRequired,
	goingReset: PropTypes.func.isRequired,
	going: PropTypes.func.isRequired,
	notGoing: PropTypes.func.isRequired,
	// ERRORS
	error: PropTypes.bool.isRequired
};


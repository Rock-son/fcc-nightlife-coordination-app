"use strict";

import React from "react";
import PropTypes from "prop-types";
import Card from "./_Card";


export default class Content extends React.PureComponent {
	constructor(props) {
		super(props);
		this.input = "";
		this.searchBtn = React.createRef();
		this.textInput = React.createRef();

		this.handleEnterPress = this.handleEnterPress.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleInput = this.handleInput.bind(this);
	}

	componentDidMount() {
		this.textInput.current.focus();
	}

	handleEnterPress(e) {
		if (e.keyCode === 13) {
			this.searchBtn.current.click();
		}
	}
	handleSearch(e) {
		e.preventDefault();
		this.props.search(this.input);
	}

	handleInput(e) {
		e.preventDefault();
		this.input = e.target.value;
	}

	render() {
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
						<input type="text" ref={this.textInput} className="content__search__input-container__input" name="location" size="50" onChange={this.handleInput} onKeyUp={this.handleEnterPress} placeholder="Where are you at?" />
						<button type="button" ref={this.searchBtn} className="content__search__input-container__button" onClick={this.handleSearch} >
							{this.props.bar.isFetching ? (<i className="fa fa-spinner fa-spin content__search__input-container__spinner" />) : "Search"}
						</button>
					</div>
					<a className="content__search__foursquare" href="https://foursquare.com/" target="_blank" rel="noreferrer noopener" >Powered by{" "}
						<i className="fa fa-foursquare" >OURSQUARE</i>
					</a>
				</article>
				<article className="content__cards">
					{/* ******************************************************* SEARCH RESULTS ********************************************************* */}
					{(this.props.error || this.props.bar.errorFetching) ?
						(<h2 className="content__cards__error">{this.props.bar.errorMsg || "Something went wrong, please try again later!"}</h2>) :

						(this.props.bar.businesses.map(business => <Card business={business} />))
					}
				</article>
			</section>
		);
	}
}

Content.propTypes = {

	search: PropTypes.func.isRequired,
	bar: PropTypes.instanceOf(Object).isRequired,
	error: PropTypes.bool.isRequired
};


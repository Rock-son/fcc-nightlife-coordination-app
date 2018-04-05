"use strict";

import React from "react";
import PropTypes from "prop-types";
// import { LOGIN, LOGOUT } from "Actions";


export default class Content extends React.Component {
	constructor(props) {
		super(props);
		this.input = "";
		this.handleSearch = this.handleSearch.bind(this);
		this.handleInput = this.handleInput.bind(this);
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
				<article className="content__main">
					<h2 className="content__main__header">Ready for a party night out?</h2>
					<div className="content__main__img-container">
						<i className="fa fa-thumbs-up content__main__img-container__img" />
						<i className="fa fa-glass content__main__img-container__img" />
						<i className="fa fa-coffee content__main__img-container__img" />
						<i className="fa fa-beer content__main__img-container__img" />
					</div>
					<input type="text" className="content__main__form__searchbar" name="location" size="50" onChange={this.handleInput} placeholder="Where are you at?" />
					<input type="submit" className="content__main__form__search-button" name="submit" value="Submit" onClick={this.handleSearch} />
				</article>
				<div className={this.props.bar.isFetching ? "content__spinner content__spinner--show" : "content__spinner"} >
					<i className="fa fa-spinner fa-spin fa-3x content__spinner__item" />
				</div>
				{ this.props.bar.businesses.map((business, index) => {
					let container = null;
					if (business) {
						container = (
							<article key={`${business.name || ""} ${index.toString()}`} className="content__results">
								{business.name}
							</article>
						);
					}
					return container;
				})
				}
			</section>
		);
	}
}

Content.propTypes = {

	search: PropTypes.func.isRequired,
	bar: PropTypes.instanceOf(Object).isRequired
};


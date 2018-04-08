"use strict";

import React from "react";
import PropTypes from "prop-types";


export default class Content extends React.PureComponent {
	constructor(props) {
		super(props);
		this.input = "";
		//this.searchBtn = React.createRef();

		this.handleEnterPress = this.handleEnterPress.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleInput = this.handleInput.bind(this);
	}

	componentDidMount() {
		//this.textInput.current.focus();
	}

	handleEnterPress(e) {
		if (e.keyCode === 13) {
			console.log(e.keyCode);
			//this.searchBtn.current.focus()
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
					<input type="text" className="content__search__input" name="location" size="50" onChange={this.handleInput} onKeyUp={this.handleEnterPress} placeholder="Where are you at?" />
					<button type="button" ref={this.searchBtn} className="content__search__button" onClick={this.handleSearch} >
						{this.props.bar.isFetching ? (<i className="fa fa-spinner fa-spin content__search__spinner" />) : "Search"}
					</button>
				</article>
				<article className="content__cards">
				{/********************************************************* SEARCH RESULTS **********************************************************/}
					{(this.props.error || this.props.bar.errorFetching) ?
						(<h2 className="content__cards__error">{this.props.bar.errorMsg || "Something went wrong, please try again later!"}</h2>) :

						(this.props.bar.businesses.map((business) => {
							let container = null,
								imagePath = "";

							if (business) {
								try {
									imagePath = `${business.venue.photos.groups[0].items[0].prefix}350x200${business.venue.photos.groups[0].items[0].suffix}`;
								} catch (error) {

								}
								container = (
									<div key={business.venue.id} className="content__cards__card" >
										<div className="content__cards__card__header" >
											<h3>{business.venue.name}</h3>
											<p>{business.venue.location.address}</p>
										</div>
										<div className="content__cards__card__body" >
											<img src={imagePath} className="content__cards__card__body__image" alt={business.venue.name} />
											<p>{business.venue.rating}</p>
										</div>
										<div className="content__cards__card__footer" >
											<p>This is a footer</p>
										</div>
									</div>
								);
							}
							return container;
						}))
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


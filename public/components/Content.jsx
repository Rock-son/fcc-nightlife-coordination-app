"use strict";

import React from "react";
import PropTypes from "prop-types";

const noTip = "No tips found!";


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
				</article>
				<article className="content__cards">
					{/* ******************************************************* SEARCH RESULTS ********************************************************* */}
					{(this.props.error || this.props.bar.errorFetching) ?
						(<h2 className="content__cards__error">{this.props.bar.errorMsg || "Something went wrong, please try again later!"}</h2>) :

						(this.props.bar.businesses.map((business) => {
							let container = null;

							if (business) {
								try {
									const imagePath = `${business.venue.featuredPhotos.items[0].prefix}350x200${business.venue.featuredPhotos.items[0].suffix}`;
									const ratingColorStyle = { backgroundColor: `#${business.venue.ratingColor}` };
									const ratingCount = business.venue.ratingSignals;
									const { text: tip, user: { firstName: user } } = business.tips[0];
									const { name } = business.venue.categories[0];
									const { phone, facebook: fbNr } = business.venue.contact;

									container = (
										<div key={business.venue.id} className="content__cards__card" >
											<div className="content__cards__card__header" >
												<div className="content__cards__card__header__container">
													<h3 className="content__cards__card__header__container__name">{business.venue.name}</h3>
													<div className="content__cards__card__header__container__rating" title={`${ratingCount} votes`} style={ratingColorStyle}>{business.venue.rating}</div>
												</div>
												<div className="content__cards__card__header__address">{business.venue.location.address}</div>
											</div>
											<div className="content__cards__card__body" >
												<div className="content__cards__card__body__category">{name}</div>
												<img src={imagePath} className="content__cards__card__body__image" alt={business.venue.name} />
												<div className="content__cards__card__body__special" >
													<a className="content__cards__card__body__special__fb" href={`https://facebook.com/${fbNr}`} target="_blank" >
														<i className="fa fa-facebook-square fa-2x" />
													</a>
												</div>
											</div>
											<div className="content__cards__card__footer" >
												<div className="content__cards__card__footer__tip" >{tip || noTip}</div>
												<div className="content__cards__card__footer__user" >{`- ${user || ""}`}</div>
											</div>
										</div>
									);
								} catch (error) {
									container = <div key={error} className="content__cards__card" >No data!</div>;
								}
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


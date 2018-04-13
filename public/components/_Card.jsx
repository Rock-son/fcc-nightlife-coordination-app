"use strict";

import React from "react";


const defaultMenuObj = { url: "" };
const defaultHoursObj = { isOpen: undefined, status: "" };
const defaultPriceObj = { message: "Moderate", currency: "/" };
const defaultTipsArray = [{ text: "", user: { firstName: "" }, canonicalUrl: ""}];
const defaultCountObj = { count: 0 };
const defaultCategoryArray = [{ name: "No category" }];
const defaultContactObj = { phone: "", facebook: "" };
const defaultStatsObj = { tipCount: 0, usersCount: 0, checkinsCount: 0 };

export default function (props) {
	let container = null;

	try {
		const imagePath = `${props.business.venue.featuredPhotos.items[0].prefix}350x200${props.business.venue.featuredPhotos.items[0].suffix}`;
		const ratingColorStyle = { backgroundColor: `#${props.business.venue.ratingColor}` };
		const ratingCount = props.business.venue.ratingSignals;

		const { text: tip, user: { firstName: user }, canonicalUrl: fsqUrl } = (props.business.tips || defaultTipsArray)[0];
		const { count } = (props.business.tips || defaultTipsArray)[0].likes || defaultCountObj;
		const { name: category } = (props.business.venue.categories || defaultCategoryArray)[0];
		const { phone, facebook: fbNr } = props.business.venue.contact || defaultContactObj;
		const { url: menuUrl } = props.business.venue.menu || defaultMenuObj;
		const { isOpen, status } = props.business.venue.hours || defaultHoursObj;
		const { currency, message } = props.business.venue.price || defaultPriceObj;
		const { tipCount: tips, usersCount: users, checkinsCount: checkins } = props.business.venue.stats || defaultStatsObj;
		const { url: website, name: venueName, location: { address, city, country } } = props.business.venue;

		const formattedAddress = `${address} ${city} ${country}`;
		const going = "none";
		const active = "active";
		const notActive = "";
		const formattedIsOpen = (() => {
			if (isOpen) {
				return "open";
			} else if (isOpen == null) {
				return "no-data";
			}
			return "closed";
		})();

		container = (
			<div key={props.business.venue.id} className="content__cards__card" >
				<div className="content__cards__card__header" >
					<div className="content__cards__card__header__container">
						<a className="content__cards__card__header__container__name" href={website} target="_blank" rel="noreferrer noopener" >{venueName}</a>
						<div className="content__cards__card__header__container__rating" data={`${message} - ${currency}`} title={`${ratingCount} votes`} style={ratingColorStyle}>{props.business.venue.rating}</div>
					</div>
					<a className="content__cards__card__header__address" href={`https://www.google.com/maps/place/${formattedAddress}`} target="_blank" rel="noreferrer noopener" >{address}</a>
				</div>
				<div className="content__cards__card__body" >
					<div style={{ display: "block", paddingBottom: "1px" }}>
						<div className="content__cards__card__body__category">{category}</div>
						<div className={`content__cards__card__body__hours ${formattedIsOpen}`} title={status || "No data"} >{`${formattedIsOpen.replace("-", " ")}`}</div>
						<div className={`content__cards__card__body__going ${going}`} title="0 GOING" >0 going</div>
					</div>
					<a href={fsqUrl} target="_blank" rel="noreferrer noopener" >
						<img src={imagePath} className="content__cards__card__body__image" alt={venueName} title="CONTINUE TO FOURSQUARE" />
					</a>
					<div className="content__cards__card__body__special" >
						<a className={`content__cards__card__body__special__menu${menuUrl ? "" : "-no-show"}`} href={menuUrl} target="_blank" rel="noreferrer noopener" >Menu</a>
						<a className={`content__cards__card__body__special__fb${fbNr ? "" : "-no-show"}`} href={`https://facebook.com/${fbNr}`} target="_blank" rel="noreferrer noopener" >
							<i className="fa fa-facebook-square fa-2x" />
						</a>
						<div className="content__cards__card__body__special__phone1" style={phone ? ({ display: 'block' }) : ({ display: 'none' })}>Phone:</div>
						<a className="content__cards__card__body__special__phone2" href={`callto://${phone}`} target="_blank" rel="noreferrer noopener" >{phone}</a>
					</div>
					<div className="content__cards__card__body__underImage" >
						Tips: <span className="content__cards__card__body__underImage__item" style={{ backgroundColor: "#2d5be3" }} >{ tips}</span>
						, Users: <span className="content__cards__card__body__underImage__item" style={{ backgroundColor: "#0732a2" }} >{ users}</span>
						, Checkins: <span className="content__cards__card__body__underImage__item" style={{ backgroundColor: "#f94877" }} >{ checkins}</span>
					</div>
					<hr className="content__cards__card__body__line" />
				</div>
				<div className="content__cards__card__footer" >
					<div className="content__cards__card__footer__tip" >{tip || `${venueName} has no user tips yet.`}</div>
					<div className="content__cards__card__footer__user">
						<div className="content__cards__card__footer__user__txt" >{`- ${user || ""} (${count} `}</div>
						<i className="fa fa-thumbs-up content__cards__card__footer__user__txt" />
						<div className="content__cards__card__footer__user__txt"> {")"}</div>
					</div>
				</div>
				<div className={`content__cards__card__footer__checkBox ${notActive}`} >
					<div className={`content__cards__card__footer__checkBox__btn go ${notActive}`} />
					<div className={`content__cards__card__footer__checkBox__label go ${notActive}`} >Going</div>
					<div className={`content__cards__card__footer__checkBox__btn nogo ${active}`} />
					<div className={`content__cards__card__footer__checkBox__label nogo ${active}`} >Not Going</div>
				</div>
			</div>
		);
	} catch (error) {
		container = <div key={error} className="content__cards__card" >{`No data available! ${error}`}</div>;
	}
	return container;
}

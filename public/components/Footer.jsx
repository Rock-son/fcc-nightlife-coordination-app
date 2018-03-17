"use strict";

import React from "react";

export function Footer() {
	return (
		<section className="footer">
			<footer>Coded with &nbsp;
			<span></span>
			<i className="fa fa-heart-o"/>
			<span>&nbsp; by </span>
			<a className="footer__codedby__link" href="https://codepen.io/Roky/full/YqGqWg" target="_blank" rel="noopener noreferrer"> Roky </a>
			<span> | </span>
			<a className="footer__codedby__link" href="https://github.com/Rock-son/Dynamic-web-projects" target="_blank" rel="noopener noreferrer">GitHub Repository</a>
			</footer>
		</section>
	);
}
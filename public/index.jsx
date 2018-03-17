"use strict";

import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import { MainWrapper } from "Main";
import css from "./style/index.scss";
import { rootReducer } from "./state/reducers";


ReactDOM.render(
	<Provider store={createStore(rootReducer)}>
		<HashRouter>
			<Switch>
				<Route exact path="/" component={MainWrapper}/>
				<Redirect path="*" to="/"/>
			</Switch>
		</HashRouter>
	</Provider>,                
	document.getElementById("root")
);
"use strict";

import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import css from "./style/index.scss";
import { rootReducer } from "RootReducer";
import { App as Home } from "App";


ReactDOM.render(
	<Provider store={createStore(rootReducer)}>
		<Router>
			<Switch>
				<Route exact path="/" component={Home}/>
				<Redirect path="*" to="/"/>
			</Switch>
		</Router>
	</Provider>,                
	document.getElementById("root")
);
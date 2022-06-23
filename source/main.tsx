import React from "react";
import ReactDOM from "react-dom";

import {
	BrowserRouter,
} from "react-router-dom";


import "@styles/main.scss"
import { App } from "@modules/app";

ReactDOM.render(
	<BrowserRouter>
		<App/>
	</BrowserRouter>, 
	document.getElementById( "main" ) 
);
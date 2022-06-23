import React, { forwardRef } from "react";
import ReactDOM from "react-dom";
import { Props } from "@utility/props";
import { Link } from "react-router-dom";

import "./styles/index.scss"

export const Text = ( props ) => {

	const { className, children } = props;

	return (<div
		className={
			Props.className( "typography", className, {
				editable: props.editable,
				italic: props.italic,
				strong: props.strong,
				link: props.link,
				q: props.q,
				transition: props.transition
			})
		}
	>{
		props.link !== undefined ? (<Link to={ props.link }>{ children }</Link>) : children
	}</div>);
};

import React, { Component, CreatePortal } from 'react'

class Confirm extends Component(){
	constructor(props){
		super(props)
		this.state = { content: ""}
		this.handleState = this.handleState.bind(this)
	}

	handleState(option){
	}

	render(){
		return (
			<div className={classes["dialog"]}>
				<h3 className={classes.message}>{this.props.message?? "Sure to Continue?"}</h3>
				<span className={classes.cancel}>Cancel</span>
				<span className={classes.ok}>Ok</span>
			</div>
			)
	}
}

export default function(){
	return (
		<React.Fragment>
		{CreatePortal(document.getElementById('dialog'),<Confirm />)}
		</React.Fragment>
		)
}
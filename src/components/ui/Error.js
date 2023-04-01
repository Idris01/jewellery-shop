import React from 'react'
import Icon from '../Icon'
import classes from './Error.module.css'
function Error(props) {
	const {message} = props
	return (
		<div className={classes.error}>
			<span className={classes["error-icon"]}>
				<Icon name="error" />
			</span>
			<div> {message ?? "An Error Has occured"}</div>
		</div>
	)
}

export default Error
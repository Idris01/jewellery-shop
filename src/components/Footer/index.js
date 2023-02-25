import React from 'react'
import classes from './Footer.module.css'
import Social from '../Social'

function Footer() {
	return (
		<div className={classes.footer}>
			<span className={classes.copy}>&copy;2023</span>
			<Social />
		</div>
	)
}

export default Footer
import React from 'react'
import Link from 'next/link'
import { Call } from '../Icon'
import classes from './CallToOrder.module.css'
import { contactNumber } from '../../web-urls'

function CallToOrder() {
	
	return (
		<div className={classes.call}>
			<Link href={`tel:${contactNumber}`}>
				<Call />
			</Link>
		</div>
	)
}

export default CallToOrder
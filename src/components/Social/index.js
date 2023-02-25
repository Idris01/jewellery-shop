import React from 'react'
import Image from 'next/image'

import facebookImage from '../../assets/images/facebook.png'
import instagramImage from '../../assets/images/instagram.png'
import whatsappImage from '../../assets/images/whatsapp.png'

import classes from './social.module.css'

function Social() {
	return (
		<ul className={classes['social']}>
			<li>
				<Image src={facebookImage} alt="facebook logo" />
			</li>
			<li>
				<Image src={instagramImage} alt="instagram logo" />
			</li>
			<li>
				<Image src={whatsappImage} alt="whatsapp logo" />
			</li>

		</ul>
		)
}

export default Social
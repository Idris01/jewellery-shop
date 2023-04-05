import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { BrandHeader } from '../../components/Header'
import classes from './checkout.module.css'
import { getProfileUrl } from '../../api-urls'
import { StateLoading } from '../../components/ui/Loader'
import { login } from '../../web-urls'


function Checkout() {
	const { data, status} = useSession()
	const isAuthenticated = status === 'authenticated'
	const user_id = data?.user?.user_id

	if (isAuthenticated){
		return (
				<Layout>
							<div className={classes.checkout}>
								<div className={classes.checkout_heading}>
									<BrandHeader title="checkout" />
								</div>
								<div className={classes.checkout_address}>address</div>
								<div className={classes.checkout_order}>order</div>	
								<div className={classes.checkout_footer}>foot</div>	
							</div>
						
				</Layout>
		)
	}
	else {
		return (
			<Layout>
							<div className={classes.checkout}>
								<div className={classes.checkout_heading}>
									<BrandHeader title="checkout" />
								</div>
								<div className={classes.checkout_anonymous}>Please <Link href={login}> Login </Link>to View this Page</div>
							</div>
				
			</Layout>
			
			)
	}

}

export default Checkout
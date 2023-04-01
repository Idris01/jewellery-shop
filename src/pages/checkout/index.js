import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Layout from '../../components/Layout'
import classes from './'
import { getProfileUrl } from '../../api-urls'
import { StateLoading } from '../../components/ui/Loader'
import { login } from '../../web-urls'


function Checkout() {
	const { data, status} = useSession()
	const [ content, setContent] = useState(<StateLoading message="loading ..." />)
	const isAuthenticated = status === 'authenticated'
	const user_id = data?.user?.user_id

	useEffect(() =>{
		if(!isAuthenticated) {
			setContent(<div>Please <Link href={login}> Login </Link>to View this Page</div>)
		}
		else{
			setContent(<div>CheckOut Page of {user_id}</div>)
		}
	},[user_id,isAuthenticated])

	return (
		<Layout>
				<div className={classes.checkout}>
					
				</div>
			
		</Layout>
	)
}

export default Checkout
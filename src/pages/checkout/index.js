import React from 'react'
import { useSession } from 'next-auth/react'
import Layout from '../../components/Layout'
import { getProfileUrl } from '../../api-urls'
import { checkout } from '../../web-urls'


function Checkout() {
	const { data: {user}} = useSession()
	return (
		<Layout>
			CheckOut Page of {user.user_id}
		</Layout>
	)
}

export default Checkout
import React, { useState } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { getProfileUrl,login } from '../../api-urls'
import { login as loginPage,profile } from '../../web-urls'
import { StateLoading } from '../../components/ui/Loader'
import { FilledLayout } from '../../components/Layout'
import Link from 'next/link'

function Profile() {
	const {status, data} = useSession()
	const [pageContent, setPageContent] = useState(<StateLoading message="Loading" />)

	if (status === 'authenticated'){
		return (
				<FilledLayout>
					welcome
				</FilledLayout>
			)
	}

	else if (status === 'loading'){
		return (
			<StateLoading message="Loading" />
			)
	}


	return (
		<FilledLayout>
			<div>
				Kindly <Link href={`${loginPage}?callbackUrl=${window.location.href}`} >Login</Link> to view your profile
			</div>
		</FilledLayout>
	)
}

export default Profile
import { unstable_getServerSession as getServerSession } from 'next-auth/next'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { authOptions } from '../../api/auth/[...nextauth]'

import { homepage } from '../../../web-urls'
import { FilledLayout } from '/src/components/Layout'
import useHttp from '/src/components/Hooks'
import { StateLoading } from '/src/components/ui/Loader'
import Error from '/src/components/ui/Error'

export default function UserProfile(){
	const session = useSession()
	const [pageData, setPageData] = useState(<StateLoading message='loading...' />)
	const userId = session.data?.user?.user_id


	useEffect(()=>{
		if(!userId){
			setPageData(<Error />)
			return
		}
		
	},[userId])


	return (
		<FilledLayout>
			{pageData}
		</FilledLayout>
		)
}


export async function getServerSideProps({req, res}){
	const session = await getServerSession(req, res, authOptions)

	if (!session){
		return {
			redirect: {
				destination: homepage,
				permanent: false
			}
		}
	}
	return {
		props: {
			session,
		}
	}
}
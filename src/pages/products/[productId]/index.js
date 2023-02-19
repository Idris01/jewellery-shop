import React from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { FilledLayout } from '../../../components/Layout'

function ProductDetail() {
	const router = useRouter();
	const { productId } = router.query
	const { data } = useSession()

	return (
		<FilledLayout>
			<div>
				Product Detail Page for {productId}
			</div>
		</FilledLayout>

	)
}

export default ProductDetail
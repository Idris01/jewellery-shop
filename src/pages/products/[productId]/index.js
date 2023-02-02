import React from 'react'
import { useRouter } from 'next/router'

import { FilledLayout } from '../../../components/Layout'

function ProductDetail() {
	const router = useRouter();
	const { productId } = router.query
	console.log(router)
	return (
		<FilledLayout>
			<div>
				Product Detail Page for {productId}
			</div>
		</FilledLayout>

	)
}

export default ProductDetail
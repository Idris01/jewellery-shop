import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { FilledLayout } from '../../../components/Layout'
import  AddItemButton  from '../../../components/AddItemButton'
import classes from './ProductDetail.module.css'
import { useHttp } from '../../../components/Hooks'
import { StateLoading } from '../../../components/ui/Loader'
import  CallToOrder from '../../../components/CallToOrder'
import { getProductApiUrl } from '../../../api-urls'

const productData = {
	pictures:[],
	unique_id:"",
	units:0,
	price:0,
	name:"",
	units_available:0,
	units_sold:0
}

function ProductDetail( props ) {
	const router = useRouter();
	const { productId } = router.query
	const  [data, setData] = useState({loading:true,error:null,productData})
	const {pictures,unique_id,units,price,name,units_available,units_sold, description} = data.productData
	
	useEffect(() =>{
		const url = getProductApiUrl(productId)
		useHttp({url})
		.then(res =>{
			const {error, data:itemData} = res
			if (!error){
				setData({
					loading:false,
					productData:{...itemData,pictures:itemData.pictures.split(',')}
				})
			}
			else{
				setData(prevData=>({
									...prevData,
									error,
									loading:false
								}))
			}
		})
			
	},[])

	return (
		<FilledLayout>
			{(!data.loading && !data.error) &&
						<div className={classes["detail-container"]}>
							<div className={classes["product-name"]} >
								{name}
							</div>
							<div className={classes.images}>
								<img src={pictures[0]} alt={`picture of ${name}`} />
							</div>
							<dl className={classes.description}>
								<dt>Description</dt>
								<dd>{description}</dd>
							</dl>
							<div className={classes.order}>
								<CallToOrder /> <AddItemButton showLabel={true} />
							</div>
							<div className={classes.review}>
								
							</div>
						</div>}
			{data.loading && <StateLoading message="loading..." />}
			{data.error && <span>{data.error}</span>}
		</FilledLayout>

	)
}

export default ProductDetail
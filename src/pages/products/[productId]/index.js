import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { FilledLayout } from '../../../components/Layout'
import Icon from '../../../components/Icon'
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
	const [shownImageIndex, setShownImageIndex] = useState(0)
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

	const toggleImage = (direction) =>{
		const numPics = pictures.length
		const directionMap = {next:1, prev:0}
		if (!direction || directionMap[direction] === undefined) return;
		let newIndex;
		if (direction === 'next'){
			newIndex = shownImageIndex + 1 === numPics? 0 : shownImageIndex + 1
		}
		else{
			newIndex = shownImageIndex - 1 < 0? numPics - 1 : shownImageIndex - 1	
		}
		setShownImageIndex(newIndex)
	}

	return (
		<FilledLayout>
			{(!data.loading && !data.error) &&
						<div className={classes["detail-container"]}>
							<div className={classes["product-name"]} >
								{name}
							</div>
							<div className={classes.images}>
								<img src={pictures[shownImageIndex]} alt={`picture of ${name}`} />
								<div onClick={toggleImage.bind(null,'next')} className={classes.next}>
									<Icon name="arrow_back_ios" />
								</div>
								<div onClick={toggleImage.bind(null,'prev')} className={classes.prev}>
									<Icon name="arrow_back_ios" />
								</div>
							</div>

							
							<dl className={classes.description}>
								<dt>Description</dt>
								<dd>{description}</dd>
							</dl>
							<div className={classes.order}>
								<CallToOrder /> <AddItemButton showLabel={true} />
							</div>
							<div className={classes["product-price"]}>{price}</div>
							<div className={classes.review}>
								Reviews Here
							</div>
						</div>}
			{data.loading && <StateLoading message="loading..." />}
			{data.error && <span>{data.error}</span>}
		</FilledLayout>

	)
}

export default ProductDetail
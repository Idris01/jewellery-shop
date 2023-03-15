import React, {useMemo, useEffect, useState} from 'react'
import { useSession } from 'next-auth/react'
import Icon, { Close, Delete, ArrowDown, ArrowUp } from '/src/components/Icon'
import Image from 'next/image'
import { createPortal } from 'react-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'


import classes from './Cart.module.css';
import { StateLoading } from '../ui/Loader'
import { cartActions } from '../slice/cart-slice'
import { getCartApiUrl } from '../../api-urls'
import { getProductUrl, checkout } from '../../web-urls'
import { useHttp } from '../Hooks'

const CartItem = (props) =>{
	const { items,itemsCount } = useSelector(state=>state.cart)
	const {status, data:{user:{user_id}, access_token }} = useSession()
	const dispatch = useDispatch()
	const router = useRouter()
	const {picture,name,price,units,id} = props
	



	const goToItemPage = (id) =>{
		// switch to the item page
		dispatch(cartActions.hideCart())
		router.push(getProductUrl(id))
	}

	const updateCartItem = (id,action,units=1) =>{
		const payload = {...items}

		if (action === 'decrement'){
			payload[id] -= payload[id] < 2? 0:1 
		}
		else if (action === 'increment'){
			payload[id] += units 
		}
		else if (action === 'delete'){
			const confirm = window.confirm("Delete Items from Cart?")
			if(!confirm) return;
			delete payload[id]
		}

		
		const body = {
			method:'PUT',
			headers:{
				'Content-Type':'application/json',
				Authorization: `Bearer ${access_token}`
			},
			body:JSON.stringify({cart:JSON.stringify(payload)})
		}

		let url=getCartApiUrl(user_id)

		useHttp({url, body})
		.then(resp=>{
			const {error, data} = resp
	        if (data){
	          const {message, data:productData} = data
	          let itemsCount = Object.values(productData).reduce((acc,current)=>acc+current,0)
	           dispatch(cartActions.setItems({
	            items:productData,
	            itemsCount
	          }))
	        }
	        else if(error){
	        	console.log(error)
	        }
		})

	}


	return (
			<li className={classes['cart-item']}>
				<div onClick={goToItemPage.bind(null,id)} className={classes["image-container"]}><Image src={picture} width={100} height={100} alt='img' /></div>
				<span className={classes['cart-item-price']}> # {price}</span>
				<div className={classes['cart-item-update']}>
					<span name='decrement' onClick={updateCartItem.bind(null,id,'decrement',1)}><ArrowDown /></span>
						<span name='amount'> x {units}</span>
					<span name='increment' onClick={updateCartItem.bind(null,id,'increment',1)}><ArrowUp /></span>
				</div>
				<span className={classes['cart-item-gross']}>{(+units*price).toFixed(2)}</span>
				<span className={classes["cart-item-delete"]} onClick={updateCartItem.bind(null,id,'delete')}>
					<Delete />
				</span>
				</li>
		)
}


/* CartContent Component 
*/

const initialContentState = {
	cartIsEmpty : true,
	cartAmount : 0,
	content: <StateLoading />
}

export const CartContent = () =>{
	// Container that contains all items added to cart
	const { items,itemsCount } = useSelector(state=>state.cart)
	const dispatch = useDispatch()
	const router = useRouter()
	const {status, data} = useSession()
	const [contentState, setContentState] = useState(initialContentState)
	const {content,cartIsEmpty,cartAmount} = contentState


	useEffect(()=>{
		if (!(status === 'authenticated')) return;

		const user_id = data?.user?.user_id
		const access_token = data?.access_token

		const body = {
			headers: {
				Authorization: `Bearer ${access_token}`
			}
		}

		useHttp({url:getCartApiUrl(user_id), body})
		.then(({error,data})=>{
			if (error) return;
			let cartAmount = 0
			let cartIsEmpty = data.length === 0

			let content = data.map(({product,units})=>{
	
				const productDetail = {
					...product,
					units,
					id:product.unique_id,
					picture:product.pictures.split(",")[0]
				}
				cartAmount += units * product.price
		
				return (
					<CartItem 
						key={product.unique_id} 
						{...productDetail} 
					/>
					)
			})

			if (!content || cartIsEmpty){
				content = <li className={classes.empty}> No Items In Cart </li>
			}

			setContentState({cartAmount,content,cartIsEmpty})
		})
	},[itemsCount])

	const hideCartItems = () =>{
		dispatch(cartActions.hideCart())
	}

	const handleCheckout = () =>{
		dispatch(cartActions.hideCart())
		router.push(checkout)
	}
	

	return (
			createPortal(
				<div className='backdrop'>
					<div className={classes['cart-content']}>
						<div className={classes['cart-content-header']}>
							<h3>
								Cart Items
							</h3>
							<span className={classes.cancel} onClick={hideCartItems}>
								<Close />
							</span> 
						</div>
						<ul className={classes['cart-content-main']}>
							{content}
						</ul>
						{!cartIsEmpty && (
							<div className={classes['cart-content-footer']}>
									<span className={classes['total-label']}>Total:</span>
									<span className={classes.total}> # {cartAmount.toFixed(2)}</span>
									<button onClick={handleCheckout} className={classes.checkout} type='button'>Checkout</button>
							</div>)
						}

					</div>

				</div>,
				document.getElementById('cart-root')
				)
			
		)
}

function Cart(props) {
	const {itemsCount,isVisible}  = useSelector(state=>state.cart)
	const session = useSession()
	const dispatch = useDispatch()
	const { status,data } = session
	const isAuthenticated = status == 'authenticated'
	const showCartItems = () =>{
		if (!isAuthenticated){
			return
		}
		dispatch(cartActions.showCart())
	}

	useEffect(()=>{
		if (!isAuthenticated){
			return
		}
		const requestContent = {
			url:getCartApiUrl(data?.user.user_id),
			body: {
				'headers': {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${session.data?.access_token}`
				}
			}
		}
		useHttp(requestContent)
		.then(res =>{
			// cart data will be availabile in the `res`
			const { error, data} = res;
			const responseData = {
				items:{},
				itemsCount:0
			}

			if (data && data.length !== 0){
				data.forEach(item=>{
					const {product_id, units} = item;
					responseData.items[product_id]=units;
					responseData.itemsCount += units
				})

				dispatch(cartActions.setItems(responseData))
			}
			else{
				// todo unable to fetch data
				// notify the user
			}
			
		})

	},[status])


	return (
		<div onClick={showCartItems} className={classes.cart}>
				<Icon name='shopping_cart' />
				<span className={classes['cart-count']}>
					<span>
						{ itemsCount}
					</span>
				</span>
		</div>
	)
}

export default Cart
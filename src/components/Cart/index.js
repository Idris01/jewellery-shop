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
import { getProductUrl } from '../../web-urls'
import { useHttp } from '../Hooks'

const CartItem = (props) =>{
	const dispatch = useDispatch()
	const router = useRouter()
	const {picture,name,price,units,id} = props
	
	console.log(picture)
	const decrement = (id) =>{
		dispatch(cartActions.removeItem({itemId:id}))
	}


	const increment = (id,amount) =>{
		// increment item with "id" by "amount"
		dispatch(cartActions.addItem({itemId:id,amount}))
	}


	const deleteItem = (id) =>{
		// Delete an item with "id" from cart
		dispatch(cartActions.deleteItem({itemId:id}))
	}

	const goToItemPage = (id) =>{
		// switch to the item page
		dispatch(cartActions.hideCart())
		router.push(getProductUrl(id))
	}


	return (
			<li className={classes['cart-item']}>
				<div onClick={goToItemPage.bind(null,id)} className={classes["image-container"]}><Image src={picture} width={100} height={100} alt='img' /></div>
				<span className={classes['cart-item-price']}> # {price}</span>
				<div className={classes['cart-item-update']}>
					<span name='decrement' onClick={decrement.bind(null,id,1)}><ArrowDown /></span>
						<span name='amount'> x {units}</span>
					<span name='increment' onClick={increment.bind(null,id,1)}><ArrowUp /></span>
				</div>
				<span className={classes['cart-item-gross']}>{(+units*price).toFixed(2)}</span>
				<span className={classes["cart-item-delete"]}><Delete /></span>
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

			if (!content){
				content = <li className={classes.empty}> No Items In Cart </li>
			}

			setContentState({cartAmount,content,cartIsEmpty})
		})
	},[itemsCount])

	const hideCartItems = () =>{
		dispatch(cartActions.hideCart())
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
									<button className={classes.checkout} type='button'>Checkout</button>
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
			if (data.length !== 0){
				data.forEach(item=>{
					const {product_id, units} = item;
					responseData.items[product_id]=units;
					responseData.itemsCount += units
				})
				// so update the data
			}
			dispatch(cartActions.setItems(responseData))
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
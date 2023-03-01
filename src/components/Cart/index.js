import React, {useMemo, useEffect, useState} from 'react'
import { useSession } from 'next-auth/react'
import Icon, { Close, Delete } from '/src/components/Icon'
import Image from 'next/image'
import { createPortal } from 'react-dom'
import { useSelector, useDispatch } from 'react-redux'


import classes from './Cart.module.css';
import { StateLoading } from '../ui/Loader'
import { cartActions } from '../slice/cart-slice'
import { getCartApiUrl } from '../../api-urls'
import { useHttp } from '../Hooks'

const CartItem = (props) =>{
	const dispatch = useDispatch()
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


	return (
			<li className={classes['cart-item']}>
				<Image src={picture} width={30} height={30} alt='img' />
				<span className={classes['cart-item-price']}> # {price}</span>
				<div className={classes['cart-item-update']}>
					<button onClick={decrement.bind(null,id)} name='decrement' type='button'>-</button>
						<span name='amount'> x {units}</span>
					<button onClick={increment.bind(null,id,1)} name='increment' type='button'>+</button>
				</div>
				<span className={classes['cart-item-gross']}>{(+units*price).toFixed(2)}</span>
					<Delete />
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
	const {items:products } = useSelector(state=>state.product)
	const myProducts = useSelector(state => state.product)
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
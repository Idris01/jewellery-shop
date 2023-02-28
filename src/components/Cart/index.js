import React, {useMemo, useEffect} from 'react'
import { useSession } from 'next-auth/react'
import Icon, { Close } from '/src/components/Icon'
import Image from 'next/image'
import { createPortal } from 'react-dom'
import { useSelector, useDispatch } from 'react-redux'


import classes from './Cart.module.css';
import { cartActions } from '../slice/cart-slice'
import { getCartApiUrl } from '../../api-urls'
import { useHttp } from '../Hooks'

const CartItem = (props) =>{
	const {picture,name,price,units,amount,id} = props
	const dispatch = useDispatch()

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
				<img src='mysource' alt='img' />
				<span className={classes['cart-item-price']}> # {price}</span>
				<div className={classes['cart-item-update']}>
					<button onClick={decrement.bind(null,id)} name='decrement' type='button'>-</button>
						<span name='amount'> x {amount}</span>
					<button onClick={increment.bind(null,id,1)} name='increment' type='button'>+</button>
				</div>
				<span className={classes['cart-item-gross']}>{(amount*price).toFixed(2)}</span>
					<ing src={Delete} alt='delete Icon' />
				</li>
		)
}


/* CartContent Component 
*/
export const CartContent = () =>{
	// Container that contains all items added to cart

	const { items,itemsCount } = useSelector(state=>state.cart)
	const {items:products } = useSelector(state=>state.product)
	const myProducts = useSelector(state => state.product)
	const dispatch = useDispatch()

	const hideCartItems = () =>{
		dispatch(cartActions.hideCart())
	}


	const cartIsEmpty = itemsCount === 0
	let content = <li className={classes.empty}> No Items In Cart </li>
	let currentItems;
	if (!cartIsEmpty){
		let keys=Object.keys(items)	
		currentItems = Object.values(products).filter(product=>keys.includes(product.id))		
		content=currentItems.map(data=>{

			let newData = {...data,amount:items[data.id]}
			return <CartItem key={data.id} {...newData} />
		})
	}

	let cartAmount;
	if(!cartIsEmpty){
		 cartAmount= currentItems.reduce((prev,item)=>{
			let thisValue = items[item.id] * item.price
			return prev + thisValue
		},0)}

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
import React, {useMemo} from 'react'
import {ShoppingBasket,CloseOutlined} from '@mui/icons-material';
import Image from 'next/image'
import { createPortal } from 'react-dom'
import { useSelector, useDispatch } from 'react-redux'


import classes from './Cart.module.css';
import { cartActions } from '../slice/cart-slice'

const CartItem = (props) =>{
	const {picture,name} = props
	return (
			<li className={classes['cart-item']}>
				{name}
			</li>
		)
}

export const CartContent = () =>{
	// Container that contains all items added to cart

	const { items,itemsCount } = useSelector(state=>state.cart)
	const {items:products } = useSelector(state=>state.product)
	const dispatch = useDispatch()

	const hideCartItems = () =>{
		dispatch(cartActions.hideCart())
	}

	const cartIsEmpty = itemsCount === 0
	let content = <li className={classes.empty}> No Items In Cart </li>
	if (!cartIsEmpty){
		let keys=Object.keys(items)
		console.log(keys)
		let currentItems = products.filter(product=>keys.includes(product.id))
		console.log(currentItems)
		content=currentItems.map(data=><CartItem {...data} />)
	}

	return (
			createPortal(
				<div className='backdrop'>
					<div className={classes['cart-content']}>
						<div className={classes['cart-content-header']}>
							<span onClick={hideCartItems}>
								<CloseOutlined />
							</span> 
						</div>
						<ul className={classes['cart-content-main']}>
							{content}
						</ul>
						{!cartIsEmpty && <div className={classes['cart-content-footer']}>
												</div>}
					</div>

				</div>,
				document.getElementById('cart-root')
				)
			
		)
}

function Cart(props) {
	const {itemsCount,isVisible}  = useSelector(state=>state.cart)
	const dispatch = useDispatch()

	const showCartItems = () =>{
		dispatch(cartActions.showCart())
	}


	return (
		<div onClick={showCartItems} className={classes.cart}>
				<ShoppingBasket />
				<span className={classes['cart-count']}>
					<span>
						{ itemsCount}
					</span>
				</span>
		</div>
	)
}

export default Cart
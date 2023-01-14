import React from 'react'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

import classes from './Cart.module.css';
import { useSelector } from 'react-redux'


function Cart(props) {
	const cartState = useSelector(state=>state.cart)
	const {itemsCount} = props
	
	return (
		<div className={classes.cart}>
				<ShoppingBasketIcon />
				<span className={classes['cart-count']}>
					<span>
						{ itemsCount || 0}
					</span>
				</span>
		</div>
	)
}

export default Cart
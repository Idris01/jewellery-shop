import React, {useMemo} from 'react'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

import classes from './Cart.module.css';
import { useSelector } from 'react-redux'

export const CartContent = () =>{
	return (
			<ul className={classes['cart-content']}>
				
			</ul>
		)
}

function Cart(props) {
	const cartState = useSelector(state=>state.cart)
	const {itemsCount} = cartState
	return (
		<div className={classes.cart}>
				<ShoppingBasketIcon />
				<span className={classes['cart-count']}>
					<span>
						{ itemsCount}
					</span>
				</span>
		</div>
	)
}

export default Cart
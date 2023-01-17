import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link  from 'next/Link'

import { authActions } from '../slice/auth-slice'
import Cart from '../Cart'
import classes from './Header.module.css';


function Header() {
	const { isAuthenticated } = useSelector(state=>state.auth)
	const dispatch = useDispatch()

	const loginHandler = ()=>{
		dispatch(authActions.login())
	}

	const logoutHandler = () => {
		dispatch(cartActions.reset())
		dispatch(authActions.logout())

	}

	return (
		<nav className={classes.header}>
			<h1 className={classes.brand}></h1>
			<ul className={classes.navigation}>
				{!isAuthenticated && <li className={classes['navigation-login']}><Link href='' onClick={loginHandler}>Login</Link></li>}
				{isAuthenticated &&<li><Link href='' onClick={logoutHandler} className={classes['navigation-logout']}>Logout</Link></li>}
			</ul>
			<Cart />
		</nav>
	)
}

export default Header
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon , { FilledIcon, Store } from '/src/components/Icon'
import Link  from 'next/Link'
import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from "next-auth/react"

import { authActions } from '../slice/auth-slice'
import { uiActions } from '../slice/ui-slice'
import Cart from '../Cart'
import classes from './Header.module.css';
import { homepage, login } from  '../../web-urls'


function Header() {
	const { status } = useSession()
	const dispatch = useDispatch()
	const router = useRouter()
	const isAuthenticated = status === 'authenticated';

	const logoutHandler = () => {
		dispatch(cartActions.reset())
		dispatch(authActions.logout())

	}

	const userHandler = () =>{
		if (!isAuthenticated){
			router.push(login);
		}
		else{
			// this will eventually be changed to show 
			// information and profiles
			router.push(homepage)
		}
	}

	const authIcon = isAuthenticated? <Icon  name='person_filled' /> : <Icon name='person' />
	return (
		<nav className={classes.header}>
			<h1 className={classes.brand} onClick={()=>router.push(homepage)}></h1>
			<ul className={classes.navigation}>
				<li onClick={userHandler} className={classes['navigation-login']}>
					{ authIcon }
				</li>
				<li onClick={()=>router.push(homepage)}>
					<Store />
				</li>
			</ul>
			<Cart />
		</nav>
	)
}

export default Header
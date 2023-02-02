import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PersonOutline as NonAuthIcon, Person } from '@mui/icons-material/';
import Link  from 'next/Link'
import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from "next-auth/react"

import { authActions } from '../slice/auth-slice'
import { uiActions } from '../slice/ui-slice'
import Cart from '../Cart'
import classes from './Header.module.css';
import { homepage } from  '../../web-urls'


function Header() {
	const session = useSession()
	const dispatch = useDispatch()
	const router = useRouter()
	const isAuthenticated = false
	console.log(session)
	const loginHandler = ()=>{
		router.push('/auth/login')
	}

	const logoutHandler = () => {
		dispatch(cartActions.reset())
		dispatch(authActions.logout())

	}

	const authIcon = isAuthenticated? <Person /> : <NonAuthIcon />
	return (
		<nav className={classes.header}>
			<h1 className={classes.brand} onClick={()=>router.push(homepage)}></h1>
			<ul className={classes.navigation}>
				<li className={classes['navigation-login']}><Link href='' onClick={loginHandler}>
					{ authIcon }
				</Link></li>
			</ul>
			<Cart />
		</nav>
	)
}

export default Header
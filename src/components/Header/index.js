import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon , { FilledIcon, Store, VerticalOption } from '/src/components/Icon'
import Link  from 'next/link'
import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from "next-auth/react"

import { authActions } from '../slice/auth-slice'
import { uiActions } from '../slice/ui-slice'
import Cart from '../Cart'
import classes from './Header.module.css';
import { homepage, login } from  '../../web-urls'
import UserOption from '../UserOption'


function Header() {
	const { status } = useSession()
	const dispatch = useDispatch()
	const router = useRouter()
	const { userOptionVisible } = useSelector(state=>state.ui)
	const isAuthenticated = status === 'authenticated';

	const logoutHandler = () => {
		dispatch(cartActions.reset())
		dispatch(authActions.logout())

	}

	const optionHandler = () =>{
		dispatch(uiActions.toggleUserOption())
	}

	const authIcon = isAuthenticated? <Icon  name='person_filled' /> : <Icon name='person' />
	return (
		<React.Fragment>
			<nav className={classes.header}>
				<h1 className={classes.brand} onClick={()=>router.push(homepage)}></h1>
				<ul className={classes.navigation}>

					<li onClick={()=>router.push(homepage)}>
						<Store />
					</li>

					<li  className={classes['navigation-login']}>
						{ authIcon }
					</li>

					<li>
						<Cart />
					</li>

					<li onClick={optionHandler}>
						<VerticalOption />
					</li>

				</ul>
							</nav>
			{userOptionVisible && <div className={classes["user-option"]}>
							<UserOption />
						</div>}
		</React.Fragment>
		
	)
}

export default Header
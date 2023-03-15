import React from 'react'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import classes from './UserOption.module.css'
import {login, profile} from '../../web-urls'
import { uiActions } from '../slice/ui-slice'

function UserOption() {
	const dispatch = useDispatch()
	const { status } = useSession()
	const router = useRouter()
	const isAuthenticated = status === 'authenticated'

	const optionHandler = (name) =>{
		dispatch(uiActions.toggleUserOption())
		if (name === 'login') router.push(login);

		if (name === 'logout'){
			signOut()
		}
		if (name === 'profile'){
			router.push(profile)
		}
	}
	return (
		<ul className={classes.container}>
			{isAuthenticated && <li onClick={optionHandler.bind(null,'logout')}>Logout</li>}
			{ isAuthenticated && <li onClick={optionHandler.bind(null,'profile')}>Profile</li>}
			{isAuthenticated && <li onClick={optionHandler.bind(null,'orders')} >Orders</li>}
			{!isAuthenticated && <li onClick={optionHandler.bind(null,'login')} >Login/Register</li>}
		</ul>
	)
}

export default UserOption
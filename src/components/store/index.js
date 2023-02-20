import { useEffect } from 'react'
import {configureStore} from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { signOut, useSession } from 'next-auth/react'

import cartSlice  from '../slice/cart-slice';
import productSlice from '../slice/product-slice';
import authSlice from '../slice/auth-slice';
import uiSlice from  '../slice/ui-slice';


const store = configureStore({
	reducer:{
		cart:cartSlice.reducer,
		product:productSlice.reducer,
		auth:authSlice.reducer,
		ui:uiSlice.reducer
	}
})

const milliSecondsToTrigger = 10000

const events = [
	"load",
	"mousemove",
	"mousedown",
	"click",
	"scroll",
	"keypress"
	]

export const StoreProvider = (props) =>{
	const {status} = useSession()
	const isAuthenticated = status === 'authenticated'

	let logoutTimer;

	const handleLogoutTimer = () => {
		logoutTimer = setTimeout(()=>{
			resetTimer()
			events.forEach(event=>{
				window.removeEventListener(event,resetTimer)
			})
			signOut()	// auto logout user
		}, milliSecondsToTrigger)
	}

	const resetTimer = () => {
		if (logoutTimer) clearTimeout(logoutTimer)
	}
	
	useEffect(()=>{
		// no need to set auto logout
		if (!isAuthenticated){
			console.log('skipping auto timer')
			return
		}

		console.log('setting auto timmer ...')
		events.forEach(event=>{
			window.addEventListener(event,()=>{
				resetTimer()
				handleLogoutTimer()
			})
		})

	}, [status])

	return (
			<Provider store={store}>
				{props.children}
			</Provider>
		)
}

export default store
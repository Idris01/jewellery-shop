import {configureStore} from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import cartSlice  from '../slice/cart-slice';
import productSlice from '../slice/product-slice';
import authSlice from '../slice/auth-slice';


const store = configureStore({
	reducer:{
		cart:cartSlice.reducer,
		product:productSlice.reducer,
		auth:authSlice.reducer
	}
})



export const StoreProvider = (props) =>{
	return (
			<Provider store={store}>
				{props.children}
			</Provider>
		)
}

export default store
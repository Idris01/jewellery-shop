import {createSlice} from '@reduxjs/toolkit'

// create slice that manage the cart visiblity
const cartSlice = createSlice({
	name: 'cart',
	initialState:{
		isVisibile:false,
		items:{},
		itemsCount:0,
	},
	reducers:{
		hideCart(state){
			state.isVisibile=false
		},
		showCart(state){
			state.isVisibile=false
		}
	}
})

// export the cart actions 
export const cartActions = cartSlice.actions
export default cartSlice

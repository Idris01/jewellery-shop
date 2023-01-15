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
		},
		addItem(state,action){
			const {itemId,amount} = action.payload
			const itemInCart = (itemId in state.items)
			const {items,itemsCount} = state
			state.items = itemInCart? {
				...items,
				[itemId]:items[itemId]+(+amount)
			}:{
				...items,
				[itemId]:(+amount)
			}
			state.itemsCount = itemsCount+1
		},
		removeItem(state,action){
			const {itemId} = action.payload
			const itemInCart = (itemId in state.items)
			const {items,itemsCount} = state


			if (!itemInCart || items[itemId] === 1 ){
				// the item is not in cart, so nothing to remove
				// or the item count is the minimum of 1
				return
			}

			state = {
				...state,
				items:{
					...items,
					[itemId]:items[itemId]-1
				},
				itemsCount:itemsCount-1
			}
		},
		deleteItem(state,action){
			const {itemId} = action.payload
			const {items,itemsCount} = state
			const itemAmount = items[itemId]
			state = {
				...state,
				items:items.filter(item=>item.id != itemId),
				itemsCount:itemsCount-itemAmount
			}

		}
		
	}
})

// export the cart actions 
export const cartActions = cartSlice.actions
export default cartSlice

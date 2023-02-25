import {createSlice} from '@reduxjs/toolkit'

const initialState = {
		isVisible:false,
		items:{},
		itemsCount:0,
	}

// create slice that manage the cart visiblity
const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers:{
		hideCart(state){
			state.isVisible=false
		},
		showCart(state){
			state.isVisible=true
		},
		addItem(state,action){
			const {itemId,amount} = action.payload
			console.log(amount)
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

			if (itemInCart && items[itemId] === 1 ){
				// the item is not in cart, so nothing to remove
				// or the item count is the minimum of 1
				return
			}

			state.itemsCount = itemsCount-1 
			state.items[itemId] = items[itemId]-1
		},
		deleteItem(state,action){
			const {itemId} = action.payload
			const {items,itemsCount} = state
			const itemAmount = items[itemId]
			const newItems = {...items}
			delete newItems[itemId]
			state.items = newItems
			state.itemsCount = state.itemsCount - itemAmount

		},
		reset(state){
			state.items = initialState.items
			state.itemsCount = initialState.itemsCount
		},
		setItems(state, action){
			const {itemsCount,items } = action.payload
			state.itemsCount = itemsCount
			state.items = items
		}
		
	}
})

// export the cart actions 
export const cartActions = cartSlice.actions
export default cartSlice

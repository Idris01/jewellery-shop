import { createSlice } from '@reduxjs/toolkit'


const authSlice = createSlice({
	name:'auth',
	initialState:{
		isAuthenticated:false,
		favorites:[]
	},
	reducers:{
		login(state){
			state.isAuthenticated=true
		},
		logout(state){
			// reset all states
			state.isAuthenticated=false
			state.favorites=[]
		},
		toggleFavorite(state,action){
			let { itemId } = action.payload
			let inFavorite = state.favorites.includes(itemId)
			const { favorites } = state

			state.favorites = inFavorite? 
				favorites.filter(id=>id !== itemId ):
				[...favorites,itemId]
		}
	}
})


export const authActions = authSlice.actions

export default authSlice
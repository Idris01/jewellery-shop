import { createSlice } from '@reduxjs/toolkit';


const productSlice = createSlice({
	name:'product',
	initialState:{
		items:[]
	},
	reducers:{
		update(state,action){
			state.items=action.payload
		}
	}
})


export const productActions = productSlice.actions

export default productSlice
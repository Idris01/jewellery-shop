import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	userOptionVisible:false,
	footerVisible:true,
	isLoading:false
}


const uiSlice = createSlice({
	name:'ui',
	initialState,
	reducers:{
		toggleUserOption(state){
			state.userOptionVisible = !state.userOptionVisible
		},
		hideFooter(state){
			state.footerVisible=false
		},
		showFooter(state){
			state.footerVisible=true
		},
		startLoading(state){
			state.isLoading=true
		},
		stopLoading(state){
			state.isLoading=false
		}
	}
})

export const uiActions = uiSlice.actions
export default uiSlice
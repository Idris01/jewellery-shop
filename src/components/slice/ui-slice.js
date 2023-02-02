import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	headerVisible:true,
	footerVisible:true,
	isLoading:false
}


const uiSlice = createSlice({
	name:'ui',
	initialState,
	reducers:{
		hideHeader(state){
			state.headerVisible = false
		},
		showHeader(state){
			state.headerVisible = true
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
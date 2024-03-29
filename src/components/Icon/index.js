import React from 'react'

function Icon(props) {
	return (
		<span className="material-symbols-outlined">
			{props.name}
		</span>
	)
}

export const FilledIcon = (props) =>{
	return(
		<span className="material-symbols">
			{props.name}
		</span>
		)
}

export const Favorite = () =>{
	return (
		<span className="material-symbols-outlined">
			favorite
		</span>

		)
}

export const Close = () =>{
	return (
		<span className="material-symbols-outlined">
		close
		</span>
		)
}

export const Store = () =>{
	return (
		<span className="material-symbols-outlined">
		store
		</span>
		)
}
export const Show = () => {
	return (<span className='material-symbols-outlined'>
				visibility
			</span>
			)
}

export const Hide = () => {
	return (<span className='material-symbols-outlined'>
				visibility_off
			</span>
			)
}

export const VerticalOption = () => {
	return (<span className='material-symbols-outlined'>
				more_vert
			</span>
			)
}

export const Delete = () => {
	return (<span className='material-symbols-outlined'>
				delete
			</span>
			)
}

export const ArrowUp = () => {
	return (<span className='material-symbols-outlined'>
				arrow_drop_up
			</span>
			)
}

export const ArrowDown = () => {
	return (<span className='material-symbols-outlined'>
				arrow_drop_down
			</span>
			)
}

export const SearchIcon = () =>{
	return (
		<span className="material-symbols-outlined">
			search
		</span>

		)
}

export const ArrowBack = () =>{
	return (
		<span className="material-symbols-outlined">
			arrow_back
		</span>

		)
}

export const NetworkOff = () =>{
	return (
		<span className="material-symbols-outlined">
			signal_disconnected
		</span>

		)
}

export const Clear = () =>{
	return (
		<span className="material-symbols-outlined">
			cancel
		</span>

		)
}

export const AddCart = () =>{
	return (
		<span className="material-symbols-outlined">
			add_shopping_cart
		</span>

		)
}

export const Call = () =>{
	return (
		<span className="material-symbols-outlined">
			call
		</span>

		)
}


export default Icon
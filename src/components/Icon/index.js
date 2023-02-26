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




export default Icon
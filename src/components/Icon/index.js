import React from 'react'

function Icon(props) {
	return (
		<span class="material-symbols-outlined">
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


export default Icon
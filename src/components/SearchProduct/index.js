import React from 'react'
import { useRouter } from 'next/router'
import { SearchIcon } from '../Icon'
import classes from './SearchProduct.module.css'
import { products } from '../../web-urls'

function SearchProduct() {
	const router = useRouter()
	return (
		<div onClick={()=>router.push(`${products}`)} className={classes["search-container"]}>
			<span className={classes["search-icon"]}><SearchIcon /></span>
			<p className={classes["search-placeholder"]}>search by name and description</p>
		</div>
	)
}

export default SearchProduct
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { SearchIcon, ArrowBack, Clear } from '../../components/Icon'
import classes from './products.module.css'
import { homepage } from '../../web-urls'
import { products } from '../../api-urls'
import { makeHttp } from '../../components/Hooks'
import { BrandHeader } from '../../components/Header'
import { StateLoading } from '../../components/ui/Loader'
import Product, { ProductContainer } from '../../components/Product'


function Search() {
	const router = useRouter()
	const [inputValue, setInputValue] = useState("")
	const [ pageContent, setPageContent ] = useState(<div>Search is Empty</div>)
	const { route, query:{search} } = router
	const [ loadSearch, setLoadSearch] = useState(false)

	const handleInputValue = (event) =>{
		const { value } = event.target
		setInputValue(value)
	}

	const clearInput = () =>{
		setInputValue("")
	}

	const doSearch =async (query,event) =>{
		event?.preventDefault()
		if (query.trim().length == 0) return;
		setPageContent(<StateLoading message="loading..." />)
		makeHttp({url:`${products}?search=${query}`})
		.then(({error, data}) =>{
			if(error){
					setPageContent(<p>{error}</p>);
			}
			else{
				let items = Object.values(data);
				if(items.length == 0){
					setPageContent(<p>No match Found</p>)
				}
				else{
					items = items.map(prod => (
						<Product
						key={prod.unique_id}
						{...prod}
						 />
						))
					setPageContent(<ProductContainer> {...items}</ProductContainer>)
				}

			}
		})
	}


	return (
		<Layout>
			<div className={classes.content}>
				<BrandHeader />
				<form className={classes.heading} onSubmit={ doSearch.bind(null,inputValue)}>
				<span onClick={() => router.push(homepage)} className={classes["back-home"]}><ArrowBack /></span>
				<input onChange={handleInputValue} className={classes.input} type="text" placeholder="search by name, category, description" value={inputValue} autoFocus/>
				{(inputValue.length > 0) && <span onClick={clearInput} className={classes.clear}><Clear /></span>}
				<button type="submit" className={classes["search-icon"]}><SearchIcon /></button>
				</form>
				<div className={classes["search-container"]}> 
					{pageContent}
				</div>
			</div>
		</Layout>
	)
}

export default Search
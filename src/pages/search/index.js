import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { SearchIcon, ArrowBack } from '../../components/Icon'
import classes from './search.module.css'
import { homepage } from '../../web-urls'
import { products } from '../../api-urls'
import { useHttp } from '../../components/Hooks'
import { StateLoading } from '../../components/ui/Loader'


function Search() {
	const router = useRouter()
	const [inputValue, setInputValue] = useState("")
	const [ pageContent, setPageContent ] = useState(<div>Search is Empty</div>)
	
	const handleInputValue = (event) =>{
		const { value } = event.target
		setInputValue(value)
	}

	const doSearch =async (event) =>{
		event.preventDefault()

		if(!inputValue || inputValue.length == 0){
			return
		}
		setPageContent(<StateLoading message="loading..." />)
		useHttp({url:`${products}?search=${inputValue}`})
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
					setPageContent(<p>{items.length} Items found</p>)
				}

			}
		})
	}



	return (
		<Layout>
			<div className={classes.content}>
				<form className={classes.heading} onSubmit={doSearch}>
				<span onClick={() => router.push(homepage)} className={classes["back-home"]}><ArrowBack /></span>
				<input onChange={handleInputValue} className={classes.input} type="text" placeholder="search by name and description" value={inputValue} autoFocus/>
				<button type="submit" className={classes["search-icon"]}><SearchIcon /></button>
				</form>
				<div> 
					{pageContent}
				</div>
			</div>
		</Layout>
	)
}

export default Search
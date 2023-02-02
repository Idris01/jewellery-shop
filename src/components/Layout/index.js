import React from 'react'
import classes from './Layout.module.css'
import Header from '../Header'
import Footer from '../Footer'
import Loader from '../ui/Loader'
import { CartContent } from '../Cart'
import { useSelector } from 'react-redux'

function Layout(props) {
	return (

		<div className={classes.container}>
			<div> {/* No header */}</div>
			<div className={classes.main}>
					{props.children}
			</div>
			<div>{/* No footer */}</div>
		</div>
	)
}



export function FilledLayout(props){
	const { isVisible:cartVisible } = useSelector(state=>state.cart)
	const {isLoading} = useSelector(state=>state.ui)
	return (
			<div className={classes.container}>
				{cartVisible && <CartContent />}
				{isLoading && <Loader />}
				<Header />
				<div className={classes.main}>
					{props.children}
				</div>
				<Footer />
			</div>
		)
}



export default Layout;
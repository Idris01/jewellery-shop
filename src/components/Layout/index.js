import React from 'react'
import classes from './Layout.module.css'
import Header from '../Header'
import Footer from '../Footer'
import { CartContent } from '../Cart'
import { useSelector } from 'react-redux'

function Layout(props) {
	return (
		<div className={classes.container}>
			{props.children}
		</div>
	)
}



export function FilledLayout(props){
	const { isVisible:cartVisible } = useSelector(state=>state.cart)
	return (
			<Layout>
				{cartVisible && <CartContent />}
				<Header />
				<div className={classes.main}>
					{props.children}
				</div>
				<Footer />
			</Layout>
		)
}



export default Layout;
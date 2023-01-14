import React from 'react'
import classes from './Layout.module.css'
import Header from '../Header'
import Footer from '../Footer'

function Layout(props) {
	return (
		<div className={classes.container}>
			{props.children}
		</div>
	)
}



export function FilledLayout(props){
	return (
			<Layout>
				<Header />
				<div className={classes.main}>
					{props.children}
				</div>
				<Footer />
			</Layout>
		)
}



export default Layout;
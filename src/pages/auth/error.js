import Layout from '../../components/Layout'
import ContinueShoppingButton from '../../components/ContinueShoppingButton'
import { BrandHeader } from '../../components/Header'
import classes from './errorpage.module.css'


function ErrorPage() {
	return (
		<Layout >
			<div className={classes.errorpage}>
				<BrandHeader />
				 <div className={classes.content}>
				 	<h2>404 not found</h2>
					<ContinueShoppingButton />
				 </div>
			</div>

		</Layout>
	)
}

export default ErrorPage
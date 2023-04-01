import Layout from '../../components/Layout'
import ContinueShoppingButton from '../../components/ContinueShoppingButton'

function ErrorPage() {
	return (
		<Layout>
			<div className={classes.errorpage}>
				<h2>404 not found</h2>
				<ContinueShoppingButton />
			</div>

		</Layout>
	)
}

export default ErrorPage
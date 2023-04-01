import { useRouter } from 'next/router'
import { homepage } from '../../web-urls'
import classes from './ContinueShopping.module.css'

function ContinueShopping() {
	const router = useRouter()
	return (
		<button onClick={()=>router.push(homepage)} type='button' className={classes.shopping}>
			Continue Shopping
		</button>
	)
}

export default ContinueShopping
import { useRouter } from 'next/router'

import { register } from '../../web-urls'
import classes from './RegisterButton.module.css'



const RegisterButton = () =>{
	const router = useRouter()
	return (
		<button onClick={(()=>router.push(register))} className={classes.register}>
			Register
		</button>
		)
}

export default RegisterButton;
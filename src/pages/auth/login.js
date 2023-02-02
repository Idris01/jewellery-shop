import {useState, useEffect} from 'react';
import { useSession } from 'next-auth/react'
import Layout from '../../components/Layout'
import RegisterButton from '../../components/RegisterButton'
import Card from '../../components/ui/Card'
import classes from './login.module.css'



const Login = () =>{
	const {status} = useSession()
	const [signInData,setSignInData] = useState({email:'',password:''})

	useEffect(()=>{
		if (status === 'authenticated'){
			// redirrect to homepage
			router.push('/');
		}
	},[status])


	const handleInput = (e) =>{
		const {name,value} = e.target;
		setSignInData(prevData =>(
			{...prevData,[name]:value}
			))
	}

	const handleSubmit = (e) =>{
		e.preventDefault()
		console.log(signInData)
	}

	return (
		<Layout>
				<div>
					<h1 className={classes['page-label']}>Login </h1>
					<Card>
					<form onSubmit={handleSubmit} className={classes.login}>
						<label forHtml='email'> Email </label>
						<input onChange={handleInput} type='email' id='email' name='email' value={signInData.email} required/>

						<label forHtml='password'> Password </label>
						<input onChange={handleInput} type='password' id='password' name='password' value={signInData.password} required />
						<button type='submit'>Sign In </button>
					</form>
					</Card>

					<div className='card-center'>
						<div>No Account Yet? </div>
						<RegisterButton />
					</div>
				</div>

		</Layout>
			
		)
}

export default Login
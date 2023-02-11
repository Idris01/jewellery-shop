import {useState, useEffect} from 'react';
import { useSession, signIn } from 'next-auth/react'
import Layout from '../../components/Layout'
import RegisterButton from '../../components/RegisterButton'
import Card from '../../components/ui/Card'
import Info from '../../components/ui/Info'
import Loader from '../../components/ui/Loader'
import classes from './login.module.css'




const Login = () =>{
	const {status} = useSession()
	const [signInData,setSignInData] = useState({email:'',password:''})
	const [isLoadingState, setIsLoadingState ] = useState({isLoading:false,responseMessage:''})
	const { responseMessage, isLoading} = isLoadingState;
	
	if (status === 'authenticated'){
		// redirect to homepage
		router.push('/');
	}
	

	const handleInput = (e) =>{
		const {name,value} = e.target;
		setSignInData(prevData =>(
			{...prevData,[name]:value}
			))
	}

	const handleSubmit = async (e) =>{
		e.preventDefault()
		setIsLoadingState(prevData=>({...prevData,isLoading:true}))
	
		const response = await signIn('customCredential',{...signInData,redirect:false})
		
		if (response.status > 204){
			setIsLoadingState(prevData=>({
				...prevData,
				isLoading:false,
				responseMessage:"invalid login credentials"
				})
			)
		}
		else{
			setIsLoadingState(prevData=>({
				...prevData,
				isLoading:false,
				responseMessage:""
			}))
		}
	}


	const showMessage = (responseMessage.trim().length > 0)

	return (
		<Layout>
				<div>
					{ (isLoading) && <Loader />}
					<h1 className={classes['page-label']}>Login </h1>
					{ showMessage  && <Info message="invalid credentials" status='error' /> }
					<Card>
					<form onSubmit={handleSubmit} className={classes.login}>
						<label forhtml='email'> Email </label>
						<input onChange={handleInput} type='email' id='email' name='email' value={signInData.email} required/>

						<label forhtml='password'> Password </label>
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
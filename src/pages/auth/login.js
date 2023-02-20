import { authOptions } from '../api/auth/[...nextauth]'
import { unstable_getServerSession as getServerSession } from "next-auth/next"

import {useState, useEffect} from 'react';
import { useSession, signIn} from 'next-auth/react'
import Layout from '../../components/Layout'
import RegisterButton from '../../components/RegisterButton'
import Card from '../../components/ui/Card'
import Info from '../../components/ui/Info'
import Loader from '../../components/ui/Loader'
import { Show, Hide } from '../../components/Icon'
import classes from './login.module.css'
import { useRouter } from 'next/router'
import { homepage } from '/src/web-urls'


const initialData = {email:'',password:''}

const Login = () =>{
	const {status} = useSession()
	const router = useRouter()
	const [signInData,setSignInData] = useState(initialData)
	const [isLoadingState, setIsLoadingState ] = useState({isLoading:false,responseMessage:''})
	const { responseMessage, isLoading} = isLoadingState;
	const [showPassword, setShowPassword ] = useState(false)


	const handleInput = (e) =>{
		const {name,value} = e.target;
		setSignInData(prevData =>(
			{...prevData,[name]:value}
			))
	}

	const passwordToggler = () =>{
		setShowPassword(prevState => !prevState)
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
			setSignInData({email:'',password:''})	// clear the loginform
			setIsLoadingState(prevData=>({
				...prevData,
				isLoading:false,
				responseMessage:""
			}))
			router.push(homepage)
		}
	}


	const showMessage = (responseMessage.trim().length > 0)
	const passwordType = showPassword? 'text': 'password';
	const eyeIcon = showPassword? <Show /> : <Hide />


	return (
		<Layout>
				<div>
					{ (isLoading) && <Loader />}
					<h1 className={classes['page-label']}>Login </h1>
					{ showMessage  && <Info message="invalid credentials" status='error' /> }
					<Card>
					<form onSubmit={handleSubmit} className={classes.login}>
						<div className={classes['input-control']}>
							<label forhtml='email'> Email </label>
							<input onChange={handleInput} type='email' id='email' name='email' value={signInData.email} required/>
						</div>
						
						<div className={classes['input-control']}>
							<label forhtml='password'> Password </label>
							<input onChange={handleInput} type={passwordType} id='password' name='password' value={signInData.password} required />
							<span onClick={passwordToggler} className={classes['password-toggler']}>{eyeIcon}</span>	
						</div>
						
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

export async function getServerSideProps({req, res}){
	const session = await getServerSession(req, res, authOptions)

	
	if (session?.expire_at > Date.now()) {
		return {
			redirect: {
				destination: homepage,
				permanent: false
			}
		}
	}
	return {
		props: {
			session,
		}
	}
}
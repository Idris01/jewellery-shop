import { useState } from 'react';
import Link from 'next/link'
import classes from './register.module.css';
import Layout from '../../components/Layout';
import { login } from '../../web-urls'
import { register } from '../../api-urls'

const initialState = {
	username:'',
	password:'',
	confirm_password:'',
	first_name:'',
	last_name:'',
	email:''
}

const Register = () =>{
	const [formData,setFormData] = useState(initialState)
	const {username,password,confirm_password,email,first_name,last_name} = formData;
	const updateData = (event) =>{
		const {name,value} = event.target;
		setFormData((prevData)=>({
			...prevData,
			[name]:value
		}))
	}

	const registerUser = async (e) =>{
		e.preventDefault();
		try{
			const data = await fetch(register,{
				method: 'POST',
				body:JSON.stringify(formData),
				headers:{
					"Content-Type":"application/json"
				}
			})
			const response = await data.json()
			console.log(response)
		}
		catch (e){
			console.log(e.message)
		}
	}

	return (
			
				<Layout>
					
					<div className={classes.register}>
						<h1 className={classes.title}>Registration Page</h1>
						<form onSubmit={registerUser} className={classes.form}>
							<label forhtml='username'>Username</label>
							<input onChange={updateData} type='text' id='username' name='username' value={username} required />

							<label forhtml='email'>Email</label>
							<input onChange={updateData} type='text' id='email' name='email' value={email} required />

							<label forhtml='first-name'>First Name</label>
							<input onChange={updateData} type='text' id='first-name' name='first_name' value={first_name} required />

							<label forhtml='last-name'>Last Name</label>
							<input onChange={updateData} type='text' id='last-name' name='last_name' value={last_name} required/>

							<label forhtml='password'>Password</label>
							<input onChange={updateData} type='password' id='password' name='password' value={password} required/>

							<label forhtml='confirm-password'>Confirm Password</label>
							<input onChange={updateData} type='password' id='confirm-password' name='confirm_password' value={confirm_password} required />

							<button type='submit' className={classes.submit}>Submit </button>
						</form>

						<div className='card-center'>
							<p>Already have an Account? <Link href={login}> Login</Link> </p>

						</div>

					</div>
					
				</Layout>
		)
}

export default Register;
import { useState, useReducer } from 'react';
import Link from 'next/link'
import classes from './register.module.css';
import Layout from '../../components/Layout';
import Loader from '/src/components/ui/Loader'
import Info from '/src/components/ui/Info'
import { uiActions } from '/src/components/slice/ui-slice'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../web-urls'
import { register } from '../../api-urls'



const initialFormState = {
	message: {
		username:'',
		password:'',
		confirm_password:'',
		first_name:'',
		last_name:'',
		email:''
	},
	error: {
		username:false,
		password:false,
		confirm_password:false,
		first_name:false,
		last_name:false,
		email:false
	},
	value: {
		username:'',
		password:'',
		confirm_password:'',
		first_name:'',
		last_name:'',
		email:''
	}
}



const reducer = (state,action) =>{
	if (action.type === 'CLEAR'){
		return initialFormState;
	}
	else if( action.type === 'UPDATE-VALUE'){
		const {name,value} = action.data;
		console.log(action.data)

		return {
			...state,
			error:{
				...state.error,
				[name]:true
			},
			value: {
				...state.value,
				[name]:value
			},
			message: {
				...state.message,
				[name]:''
			}
		}
	}

	else if (action.type === 'RESPONSE-ERROR'){
		const { data } = action;
		const { error, message } = state;
		const newError = {...error};
		const newMessage = {...message};

		Object.keys(data).forEach(item=>{
			newError[item] = true;
			newMessage[item] = data[item][0]
		})
		console.log(newMessage)
		return {...state,error:newError,message:newMessage}
	}
	return initialFormState
}


const Register = () =>{
	const [formState, dispatchFormState] = useReducer(reducer, initialFormState);
	const {isLoading} = useSelector(state => state.ui);
	const dispatch = useDispatch();

	const [showMessage, setShowMessage] = useState(false) // displays status message
	const { error:formError, message:formMessage, value: formData  } = formState;
	const {username,password,confirm_password,email,first_name,last_name} = formData;

	
	const updateData = (event) =>{
		const {name,value} = event.target;
		dispatchFormState({type:'UPDATE-VALUE', data:{name,value}});
	}

	const registerUser = async (e) =>{
		e.preventDefault();

		dispatch(uiActions.startLoading())

		try{
			const data = await fetch(register,{
				method: 'POST',
				body:JSON.stringify(formData),
				headers:{
					"Content-Type":"application/json"
				}
			})
			if (data.status > 204){
				const response = await data.json()
				const info = Object.keys(response) // elements with error
				dispatchFormState({type:'RESPONSE-ERROR', data:response})
			}
			dispatch(uiActions.stopLoading())
		}
		catch (e){
		}
	}


	return (			
				<Layout>
					{ isLoading && <Loader />}
					<div className={classes.register}>
						<h1 className={classes.title}>Registration Page</h1>
						{ showMessage && <Info message='error' status='error' /> }
						<form onSubmit={registerUser} className={classes.form}>
							<div className={classes.input_group}>
								<label forhtml='username'>Username</label>
								<input className={formError.username?classes.form_input_error:classes.form_input} onChange={updateData} type='text' id='username' name='username' value={username} required />
								<span className={classes.error}>Message</span>
							</div>
							
							<div className={classes.input_group}>
								<label forhtml='email'>Email</label>
								<input className={formError.email?classes.form_input_error:classes.form_input} onChange={updateData} type='text' id='email' name='email' value={email} required />
								<span className={classes.error}>Message</span>

							</div>	

							<div className={classes.input_group}>
								<label forhtml='first-name'>First Name</label>
								<input className={formError.first_name?classes.form_input_error:classes.form_input} onChange={updateData} type='text' id='first-name' name='first_name' value={first_name} required />
								{formError.first_name && <span className={classes.error}>{formMessage.first_name}</span>}
							
							</div>
							
							<div className={classes.input_group}>
								<label forhtml='last-name'>Last Name</label>
								<input className={formError.last_name?classes.form_input_error:classes.form_input} onChange={updateData} type='text' id='last-name' name='last_name' value={last_name} required/>
								{formError.last_name && <span className={classes.error}>{formMessage.last_name}</span>}
							
							</div>
							
							<div className={classes.input_group}>
								<label forhtml='password'>Password</label>
								<input className={formError.password?classes.form_input_error:classes.form_input} onChange={updateData} type='password' id='password' name='password' value={password} required/>
								{formError.password && <span className={classes.error}>{formMessage.password}</span>}
							</div>
							
							<div className={classes.input_group}>
								<label forhtml='confirm-password'>Confirm Password</label>
								<input className={formError.confirm_password?classes.form_input_error:classes.form_input} onChange={updateData} type='password' id='confirm-password' name='confirm_password' value={confirm_password} required />
								{formError.confirm_password && <span className={classes.error}>{formMessage.confirm_password}</span>}
							</div>
							
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
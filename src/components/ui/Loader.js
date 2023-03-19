import classes from './Loader.module.css';
import { createPortal } from 'react-dom'


const Loader = () =>{
	if (typeof window !== 'undefined' ){
		return (
		createPortal(
			<div className={classes.modal}>
				<div className={classes['spinner-container']}>
				<span className={classes.spinner}></span>
				<h3>please wait...</h3>
			</div>
			</div>,document.getElementById('modal'))
		)
	}
	return(
		<div className={classes.modal}>
			<div className={classes['spinner-container']}>
				<span className={classes.spinner}></span>
				<h3>please wait...</h3>
			</div>
				
			</div>
		)
	
}

export function StateLoading(props){
	const { message } = props
	return (
			<div className={classes["state-loading"]}>
				<span></span>
				{message && <span>{message}</span>}
			</div>
		)
}

export default Loader
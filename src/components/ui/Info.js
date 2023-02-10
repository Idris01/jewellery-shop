import classes from './Info.module.css'

function Info(props) {
	// props has a property status that can either be 'success' or 'error'
	const {status,message} = props;
	const style = status === 'success'? classes.success : classes.error
	return (
		<div className={classes.container}>
			<div className={style}>
			{message}
			</div>
		</div>
	)
}

export default Info
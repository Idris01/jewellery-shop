import { signIn } from 'next-auth/react'
import {useDispatch,useSelector} from 'react-redux'
import { useSession } from 'next-auth/react'
import { useHttp } from '../Hooks'
import { AddCart } from '../Icon'
import classes from './AddItemButton.module.css'
import { getCartApiUrl } from '../../api-urls'
import { cartActions } from '../slice/cart-slice'

function AddItemButton(props) {
	const session = useSession()
	const dispatch = useDispatch()
	const { items:itemsInCart } = useSelector(state=>state.cart)
	const { unique_id, showLabel } = props
	const { status } = session
	const isAuthenticated = status === 'authenticated'
	const url = getCartApiUrl(session.data?.user?.user_id)

	const addItemToCart = async (id,amount) =>{
    if (!isAuthenticated){
      signIn('customCredential')
    }

    // data to be syncronized with the backend 
    const newData = { 
      ...itemsInCart,
      [id]: itemsInCart[id]? itemsInCart[id]+amount : amount
       }

    // body of fetch request
    const body = {
      method:"PUT",
      body: JSON.stringify({"cart":JSON.stringify(newData)}),
      headers:{
        'Content-Type': "application/json",
        'Authorization': `Bearer ${session.data?.access_token}`
      },
    }
       useHttp({url,body})
       .then(res=>{
        
        const {error, data} = res
        if (data){
          const {message, data:productData} = data
          let itemsCount = Object.values(productData).reduce((acc,current)=>acc+current,0)
           dispatch(cartActions.setItems({
            items:productData,
            itemsCount
          }))
        }
       })
   
  }
	return (
		<button onClick={addItemToCart.bind(null,unique_id,1)} type='button' className={classes['add-to-cart']}>
			<AddCart />
			{showLabel && <span className={classes.label}>Add to Cart</span>}
		</button>
	)
}

export default AddItemButton
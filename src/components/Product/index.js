import {Favorite} from '@mui/icons-material'
import {useDispatch,useSelector} from 'react-redux'
import Image from 'next/image'

import {cartActions} from '../slice/cart-slice'
import {authActions} from '../slice/auth-slice'
import classes from './Product.module.css'
import earingImage from '../../assets/images/earing1.jpg'


const Product = (props) =>{

  const dispatch = useDispatch()
  const {favorites,isAuthenticated} = useSelector(state=>state.auth)
  const {pictures,id,units,price,name} = props
  const addItemToCart = (id,amount) =>{
    if (!isAuthenticated){
      return
    }
    dispatch(cartActions.addItem({
      itemId:id,
      amount
    }))
  }

  const favoriteHandler = (itemId) => {
    if(!isAuthenticated){ // only authenticated user can add item to cart
      return
    }
    dispatch(authActions.toggleFavorite({itemId}))
  }

  let itemInFavorite = favorites.includes(id)
  let favClass = itemInFavorite? classes.favorite : classes['no-favorite']
  
  return (
      <li className={classes.product}>
        <Image src={earingImage} alt={`Picture of ${name}`} />
        <span>reviews</span>
        <span className={classes.name}>{name}</span>
        <div className={classes['to-cart']}>
          <span className={classes.price}># {price.toFixed(2)}</span>
          <span onClick={favoriteHandler.bind(null,id)} className={favClass}><Favorite /></span>
          <button onClick={addItemToCart.bind(null,id,1)} type='button' className={classes['add-to-cart']}>Add To Cart</button>
        </div>
      </li>
    )
}


export const ProductContainer = (props) =>{
  return (
      <ul className={classes['product-container']}>
        {props.children}
      </ul>
    )
}


export default Product
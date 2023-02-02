import {Favorite} from '@mui/icons-material'
import {useDispatch,useSelector} from 'react-redux'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { getProductUrl } from '../../web-urls';

import {cartActions} from '../slice/cart-slice'
import {authActions} from '../slice/auth-slice'
import classes from './Product.module.css'


const Product = (props) =>{

  const router = useRouter();
  const dispatch = useDispatch()
  const {favorites,isAuthenticated} = useSelector(state=>state.auth)
  const {pictures,unique_id,units,price,name,units_available,units_sold} = props
  const productPictureUrls = pictures.split(',')


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

  let itemInFavorite = favorites.includes(unique_id)
  let favClass = itemInFavorite? classes.favorite : classes['no-favorite']
  let inStock = units_available > units_sold

  const productUrl = getProductUrl(unique_id);


  return (
      <li className={classes.product}  >
        <div onClick={()=>router.push(productUrl)} className={classes.image}>
          <img  src={productPictureUrls[0]} alt={`Picture of ${name}`} />
        </div>
        <span>reviews</span>
        <span className={classes.name}>{name}</span>
        <div className={classes['to-cart']}>
          <span className={classes.price}># {parseInt(price).toFixed(2)}</span>
          <span onClick={favoriteHandler.bind(null,unique_id)} className={favClass}><Favorite /></span>
          <button onClick={addItemToCart.bind(null,unique_id,1)} type='button' className={classes['add-to-cart']}>Add To Cart</button>
        </div>
        {inStock? 
          <span className={classes.instock}> Instock </span> : 
          <span className={classes.notInStock}>Out of Stock </span>
        }
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
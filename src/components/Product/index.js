import { Favorite } from '/src/components/Icon'
import {useDispatch,useSelector} from 'react-redux'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { getProductUrl } from '../../web-urls';
import { getCartApiUrl } from '../../api-urls'

import {cartActions} from '../slice/cart-slice'
import {authActions} from '../slice/auth-slice'
import { useHttp } from '../Hooks'
import classes from './Product.module.css'


const Product = (props) =>{

  const router = useRouter();
  const session = useSession()
  const dispatch = useDispatch()
  const { items:itemsInCart } = useSelector(state=>state.cart)
  const {favorites} = useSelector(state=>state.auth)
  const {pictures,unique_id,units,price,name,units_available,units_sold} = props
  const productPictureUrls = pictures.split(',')

  const isAuthenticated = session.status === 'authenticated'
  const url = getCartApiUrl(session.data?.user?.user_id)

  const addItemToCart = async (id,amount) =>{
    if (!isAuthenticated){
      return
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
        console.log(res)
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
          <span onClick={favoriteHandler.bind(null,unique_id)} className={favClass}>
            <Favorite />
          </span>
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
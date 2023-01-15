import {Favorite} from '@mui/icons-material'
import {useDispatch,useSelector} from 'react-redux'
//import {} from '@reduxjs/toolkit'
import Image from 'next/image'

import {cartActions} from '../slice/cart-slice'
import classes from './Product.module.css'
import earingImage from '../../assets/images/earing1.jpg'


const Product = (props) =>{
  //const {itemsCount} = useSelector(state=>state.cart)
  const dispatch = useDispatch()
  const {pictures,id,units,price,name} = props
  const addItemToCart = (id,amount) =>{
    dispatch(cartActions.addItem({
      itemId:id,
      amount
    }))
    console.log(id,amount)
  }
  return (
      <li className={classes.product}>
        <Image src={earingImage} alt={`Picture of ${name}`} />
        <span>reviews</span>
        <span className={classes.name}>{name}</span>
        <div className={classes['to-cart']}>
          <span className={classes.price}># {price.toFixed(2)}</span>
          <span className={classes.favorite}><Favorite /></span>
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
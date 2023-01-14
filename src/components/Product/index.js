import {Favorite} from '@mui/icons-material'

import Image from 'next/image'
import classes from './Product.module.css'

import earingImage from '../../assets/images/earing1.jpg'


const Product = (props) =>{
  const {pictures,id,units,price,name} = props
  return (
      <li className={classes.product}>
        <Image src={earingImage} alt={`Picture of ${name}`} />
        <span>reviews</span>
        <span className={classes.name}>{name}</span>
        <div className={classes['to-cart']}>
          <span className={classes.price}># {price.toFixed(2)}</span>
          <span className={classes.favorite}><Favorite /></span>
          <button type='button' className={classes['add-to-cart']}>Add To Cart</button>
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
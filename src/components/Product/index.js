import {Favorite} from '@mui/icons-material'

import Image from 'next/image'
import classes from './Product.module.css'

import earingImage from '../../assets/images/earing1.jpg'


const Product = (props) =>{
  const {pictures,id,units,price,name} = props
  return (
      <li className={classes.product}>
        <Image src={earingImage} alt={`Picture of ${name}`} />
       
        <span>{price}</span>
        <div>
          <span>reviews</span>
          <span><Favorite /></span>
          <button>Add To Cart</button>
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
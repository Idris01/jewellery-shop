import { Fragment , useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

import products from '../DummyData'
import { productActions } from '../components/slice/product-slice'
import earingImage from '/src/assets/images/earing1.jpg'
import Product, {ProductContainer} from '../components/Product'

export default function Home(props) {

  const dispatch = useDispatch()
  const [webProduct,setWebProduct] = useState({items:props.items})
  const {items} = webProduct

  dispatch(productActions.update(items))
 

  let content;
  if (items.length === 0){
    content = <li>No content Found!</li>
  }
  else{
    content=items.map(item=><Product key={item.id} {...item} />)
  }

  return (
    <ProductContainer>
      {content}
    </ProductContainer>
  )
}

export function getStaticProps(){
  return {
    props: {
      items:products
    }
  }
}
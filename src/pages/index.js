import { Fragment } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import products from '../DummyData'
import earingImage from '/src/assets/images/earing1.jpg'

import Product, {ProductContainer} from '../components/Product'

export default function Home() {
  
  let content;
  if (products.length === 0){
    content = <li>No content Found!</li>
  }
  else{
    content=products.map(item=><Product key={item.id} {...item} />)
  }

  return (
    <ProductContainer>
      {content}
    </ProductContainer>
  )
}

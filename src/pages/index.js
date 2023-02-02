import { Fragment , useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

import products from '../DummyData'
import { productActions } from '../components/slice/product-slice'
import earingImage from '/src/assets/images/earing1.jpg'
import Product, {ProductContainer} from '../components/Product'
import { FilledLayout } from '../components/Layout'
import { products as productsUrl } from '../api-urls'

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
    console.log(items)
    content=Object.values(items).map(item=><Product key={item.unique_id} {...item} />)
  }

  return (
    <FilledLayout>
      <ProductContainer>
        {content}
      </ProductContainer>
    </FilledLayout>
  )
}

export async function getStaticProps(){
  const data = await fetch(productsUrl);
  const response = await data.json()
  return {
    props: {
      items:response
    }
  }
}
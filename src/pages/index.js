import { Fragment , useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useSession, signOut } from 'next-auth/react'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'

import { productActions } from '../components/slice/product-slice'

import Product, {ProductContainer} from '../components/Product'
import { FilledLayout } from '../components/Layout'
import { products as productsUrl } from '../api-urls'

export default function Home(props) {
  const dispatch = useDispatch()
  const [webProduct,setWebProduct] = useState({items:props.items,status:props.status,message:props.message})
  const { data:sessionData, status:sessionStatus} = useSession()

  

  const {items,status,message} = webProduct
  const itemNum = [1, 2, 3, 4, 5, 6]

  
  let content;
  if (!items ){
    content = <li> { message }</li>
  }
  else if (items.length === 0){
    content = <li>No content Found!</li>
  }
  else{
        dispatch(productActions.update(items))
        const prodList = Object.values(items)
        content=itemNum.map(item=><Product key={item} {...prodList[0]} />)
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
  const msg = {
    items:null,
    status:200,
    message:''
  }

  try{
    const data = await fetch(productsUrl);
    const response = await data.json()
    msg.items=response
  }
  catch (e){
    msg.status = 404
    msg.message=e.message
  }
  
  return {
    props: {
     ...msg
    }
  }
}
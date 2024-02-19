import React from 'react'
import Navbar from '../features/navbar/navbar'
import ProductList from '../features/product-list/Components/ProductList'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <Navbar>
            <ProductList></ProductList>
        </Navbar>
    </div>
  )
}

export default Home
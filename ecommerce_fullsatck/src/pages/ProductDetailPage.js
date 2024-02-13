import React from "react";
import ProductDetail from "../features/product-list/Components/ProductDetail";
import Navbar from "../features/navbar/navbar";
import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const {id} = useParams()
  return (
    <div>
      <Navbar>
        <ProductDetail id={id}></ProductDetail>
      </Navbar>
    </div>
  );
};

export default ProductDetailPage;

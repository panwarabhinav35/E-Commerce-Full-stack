import React from "react";
import ProductDetail from "../features/product-list/Components/ProductDetail";
import Navbar from "../features/navbar/navbar";

const ProductDetailPage = () => {
  return (
    <div>
      <Navbar>
        <ProductDetail></ProductDetail>
      </Navbar>
    </div>
  );
};

export default ProductDetailPage;

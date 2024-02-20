import React from "react";
import ProductForm from "../features/admin/Components/ProductForm";
import Navbar from "../features/navbar/navbar";

const AdminProductFormPage = () => {
  return (
    <div>
      <Navbar>
        <ProductForm></ProductForm>
      </Navbar>
    </div>
  );
};

export default AdminProductFormPage;

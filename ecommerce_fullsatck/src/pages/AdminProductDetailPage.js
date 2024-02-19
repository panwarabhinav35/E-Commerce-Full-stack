import React from "react";
import Navbar from "../features/navbar/navbar";
import { useParams } from "react-router-dom";
import AdminProductDetail from "../features/admin/Components/AdminProductDetail";

const AdminProductDetailPage = () => {
  const {id} = useParams()
  return (
    <div>
      <Navbar>
        <AdminProductDetail id ={id}></AdminProductDetail>
      </Navbar>
    </div>
  );
};

export default AdminProductDetailPage;

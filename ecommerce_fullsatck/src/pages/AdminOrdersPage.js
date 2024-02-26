import React from "react";
import Navbar from "../features/navbar/navbar";
import AdminOrders from "../features/admin/Components/AdminOrders";

const AdminOrdersPage = () => {
  return (
    <div>
      <Navbar>
        <AdminOrders></AdminOrders>
      </Navbar>
    </div>
  );
};

export default AdminOrdersPage;

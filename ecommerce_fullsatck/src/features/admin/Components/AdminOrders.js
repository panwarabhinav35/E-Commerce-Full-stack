import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAsync,
  selectadminOrder,
  selecttotalOrder,
  updateOrderAsync,
} from "../../order/orderSlice";
import { XMarkIcon, EyeIcon, PencilIcon } from "@heroicons/react/24/outline";
import { discountedPrice } from "../../../app/Constants";
import Pagination from "../../Common/Pagination";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [editableOrderId, setEditableOrderId] = useState(-1);

  useEffect(() => {
    const pagination = { _page: page };
    //todo Server will filter deleted products
    dispatch(fetchAllOrdersAsync(pagination));
  }, [dispatch, page]);
  const orders = useSelector(selectadminOrder);
  const total_Orders = useSelector(selecttotalOrder)

  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };
  const handleShow = (order) => {
    console.log(order);
  };
  const handleUpdate = (e, order) => {
    // console.log(e.target.value)
    dispatch(updateOrderAsync({ ...order, status: e.target.value }));
    setEditableOrderId(-1);
  };

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
    }
  };
  const handelPage = (e,page)=>{
    setPage(page)
  }

  return (
    <div className="w-auto">
      <div className="overflow-x-auto">
        <div className="bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
          <div className="p-15">
            <div className="bg-white shadow-md rounded my-6">
              <table className=" w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Order#</th>
                    <th className="py-3 px-6 text-left">Items</th>
                    <th className="py-3 px-6 text-center">Total Amount</th>
                    <th className="py-3 px-6 text-center">Address</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {orders.map((order) => (
                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="mr-2"></div>
                          <span className="font-medium">{order.id}</span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left">
                        {order.products.map((item) => (
                          <div className="flex items-center">
                            <div className="mr-2">
                              <img
                                className="w-6 h-6 rounded-full"
                                src={item.product.thumbnail}
                              />
                            </div>
                            <span>
                              {item.product.title} - #{item.quantity} - $
                              {discountedPrice(item.product)}
                            </span>
                          </div>
                        ))}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center">
                          ${order.totalAmount}
                        </div>
                      </td>
                      <td className="justify-normal text-center py-3 px-6">
                        <div>
                          <div>
                            <strong>{order.selectedAddress.name}</strong>
                          </div>
                          <div>, {order.selectedAddress.street}</div>
                          <div>, {order.selectedAddress.pinCode}</div>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        {order.id === editableOrderId ? (
                          <select onChange={(e) => handleUpdate(e, order)}>
                            <option>---Select Value---</option>
                            <option value="pending"> Pending</option>
                            <option value="dispatched"> Dispatched</option>
                            <option value="delivered"> Delivered</option>
                            <option value="cancelled"> Cancelled</option>
                          </select>
                        ) : (
                          <span
                            className={`${chooseColor(
                              order.status
                            )} py-1 px-3 rounded-full text-xs`}
                          >
                            {order.status}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                            <EyeIcon
                              className="w-6 h-6"
                              onClick={(e) => handleShow(order)}
                            ></EyeIcon>
                          </div>
                          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                            <PencilIcon
                              className="w-6 h-6"
                              onClick={(e) => handleEdit(order)}
                            ></PencilIcon>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Pagination
          page={page}
          setPage={setPage}
          handelPage={handelPage}
          total_Items={total_Orders}
        ></Pagination>
      </div>
    </div>
  );
};

export default AdminOrders;

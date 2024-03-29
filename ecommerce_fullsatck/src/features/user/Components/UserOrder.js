import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedinUserOrdersAsync, selectUserInfo, selectUserOrders } from "../userSlice";
import { discountedPrice } from "../../../app/Constants";


const UserOrder = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  useEffect(() => {
    dispatch(fetchLoggedinUserOrdersAsync());
  }, [dispatch]);

  const orders = useSelector(selectUserOrders);
  return (
    <div>
      {orders && orders.map((order) => (
        
        <div>

          <div className="mx-auto mt-12 max-w-7xl bg-white px-4 sm:px-6 lg:px-8">
            <div>
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <h1 className="text-4xl mb-4 font-bold tracking-tight text-red-900">
                  Order #{order.id}
                </h1>
                <h2>Order status : {order.status}</h2>
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {order.products.map((product) => (
                      <li key={product.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">

                          <img
                            src={product.product.thumbnail}
                            alt={product.product.description}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={product.href}>{product.product.title}</a>
                              </h3>
                              <p className="ml-4">${discountedPrice(product.product)}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.product.brand}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-500">
                              <label
                                htmlFor="quantity"
                                className="inline mr-4 text-sm font-medium leading-6 text-gray-900"
                              >
                                Qty : {product.quantity}
                              </label>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${order.totalAmount}</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total Items</p>
                  <p>{order.totalItems}</p>
                </div>
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Selected Address
                  </h2>
                  <ul role="list">
                      <li
                        className="flex justify-between gap-x-6 py-5 border-solid border-2 border-gray-200 px-5"
                      >
                        <div className="flex min-w-0 gap-x-4">
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              {order.selectedAddress.name}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {order.selectedAddress.street}
                            </p>
                            <p className="text-sm leading-6 text-gray-900">
                              {order.selectedAddress.pinCode}
                            </p>
                          </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                          <p className="text-sm leading-6 text-gray-900">
                            Phone : {order.selectedAddress.phoneNumber}
                          </p>
                          <p className="text-sm leading-6 text-gray-900">
                            {order.selectedAddress.city}
                          </p>
                        </div>
                      </li>
                  </ul>

                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserOrder;

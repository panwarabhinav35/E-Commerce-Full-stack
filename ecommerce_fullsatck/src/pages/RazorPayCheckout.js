import { useSelector } from "react-redux";
import { selectCurrentOrder } from "../features/order/orderSlice";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
// import { selectCurrentOrder } from "../features/order/orderSlice";

export default function RazorPayCheckOut() {
  const currentOrder = useSelector(selectCurrentOrder);
  const orderObject = { amount: currentOrder.totalAmount };
  const [ordersucces, setOrderSuccess] = useState(false);

  const handlePayment = async () => {
    const keyResponse = await fetch("http://localhost:8080/getKey");
    const key = await keyResponse.json();
    const response = await fetch("http://localhost:8080/razorpay/", {
      method: "POST",
      body: JSON.stringify(orderObject),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    const options = {
      key: key.key,
      amount: data.amount,
      currency: "INR",
      name: "AssKicker",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: data.id, // This is a sample Order ID. Pass the id obtained in the response of Step 1
      //   callback_url: "http://localhost:8080/paymentVerification",
      prefill: {
        name: "Abhinav Panwar",
        email: "aaditya.sharma@example.com",
        contact: "8765434566",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#121212",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
    if (data) {
      setOrderSuccess(true);
    }
  };

  return (
    <div className=" align-middle justify-center mt-80" >
      {!ordersucces && (
        <div
          className="flex items-center cursor-pointer justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          onClick={handlePayment}
        >
          Pay using RazorPay
        </div>
      )}
      {ordersucces && (
        <Link to={`/order-success/${currentOrder.id}`}>
          <div className="flex items-center cursor-pointer justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
            Click here to proceed
          </div>
        </Link>
      )}
    </div>
  );
}

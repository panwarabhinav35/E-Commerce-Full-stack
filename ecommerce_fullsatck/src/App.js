import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Protected from "./features/auth/Components/Protected";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import SignupPage from "./pages/SignupPage";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { selectLoggedInUser } from "./features/auth/authSlice";
import { useEffect } from "react";
import { fetchItemByUserIDAsync, selectCartItems } from "./features/Cart/cartSlice";
import PageNotFound from "./pages/404";
import OrderSuccessPage from "./pages/OrderSuccess";
import UserOrderPage from "./pages/UserOrderPage";
import UserProfile from "./features/user/Components/UserProfile";
import UserProfilePage from "./pages/UserProfilePage";
import { fetchLoggedinUserAsync } from "./features/user/userSlice";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home></Home>
      </Protected>
    ),
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <Checkout></Checkout>
      </Protected>
    ),
  },
  {
    path: "/product-detail/:id",
    element: (
      <Protected>
        <ProductDetailPage></ProductDetailPage>
      </Protected>
    ),
  },
  {
    path: "/order-success/:id",
    element: (
      <OrderSuccessPage></OrderSuccessPage>
    ),
  },
  {
    path: "/orders",
    element: (
      <UserOrderPage></UserOrderPage>
    ),
  },
  {
    path: "/profile",
    element: (
     <UserProfilePage></UserProfilePage>
    ),
  },
  {
    path: "*",
    element: (
      <PageNotFound></PageNotFound>
    ),
  },
  
]);

function App() {
  const dispatch = useDispatch()
  const items =useSelector(selectCartItems)
  const user =useSelector(selectLoggedInUser);
  useEffect(()=>{
    if(user){
    dispatch(fetchItemByUserIDAsync(user.id))
    dispatch(fetchLoggedinUserAsync(user.id))
  }
  }, [dispatch,user,items])
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

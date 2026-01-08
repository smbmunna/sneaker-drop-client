import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home/Home";
import Products from "../pages/Home/Products/Products";
import Login from "../pages/Authentication/Login/Login";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    children: [
        {
            index: true,
            Component: Home
        },
        {
            path: 'products', 
            Component: Products
        },
        {
          path: 'login', 
          Component: Login
        }
    ]
  },
]);

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login.js";
import User from "./User.js";
import Reg from "./Reg.js";
import ErrorPage from "./error_page.js";
import "../input.css"
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import classNames from "classnames";
const router = createBrowserRouter([
    {
      path: "/", 
      element: <Login />, 
      errorElement: <ErrorPage />
    },
    {
      path: "/login", 
      element: <Login />, 
    },
    {
        path: "/reg",
        element: <Reg />,
    },
    {
      path: '/users/:id',
      element: <User />,
    }
  ]);

function Main(){
     
    return(  
      <RouterProvider router={router} />
    )
}

export default Main
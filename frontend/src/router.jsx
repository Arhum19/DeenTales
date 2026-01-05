// React Router setup
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import OAuth from "./pages/OAuth/OAuth";
import MainChat from "./pages/MainChat/MainChat";
import TryFree from "./pages/TryFree/TryFree";
// import TestAPI from "./pages/test/TestAPI.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/visuals",
    element: <Home />,
  },
  {
    path: "/features",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/oauth",
    element: <OAuth />,
  },
  {
    path: "/chat",
    element: <MainChat />,
  },
  {
    path: "/try-free",
    element: <TryFree />,
   }
  // {
  //   path: "/test",
  //   element: <TestAPI />
  // }
]);

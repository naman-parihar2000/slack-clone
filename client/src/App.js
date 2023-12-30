import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Workspace from ".//components/Landing/Workspace";
import React from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/workspace",
    element: <Workspace />,
  },
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};
export default App;

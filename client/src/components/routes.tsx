import App from "../App";
import ErrorPage from "./ErrorPage/ErrorPage.jsx";
import LogOut from "./Authentication/LogOut/LogOut.jsx";
import Login from "./Authentication/Login/Login.jsx";
import SignUp from "./Authentication/Sign Up/SignUp.jsx";
import RequireAuth from "./Authentication/RequireAuth.jsx";
import Home from "./Home/Home.js";
import PostMessage from "./postMessage/postMessage.js";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/post-message",
        element: <PostMessage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/logout",
    element: (
      <RequireAuth>
        <LogOut />
      </RequireAuth>
    ),
  },
];

export default routes;

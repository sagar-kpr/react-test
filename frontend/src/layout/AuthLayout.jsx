import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AuthLayout(props) {
  const { children } = props;
  const router = useNavigate();
  const isLoggedin =  (window.localStorage.getItem("loggedIn").toLowerCase === "true");  //"false"
  if (!isLoggedin) router("/login");

  return <Fragment>{children}</Fragment>;
}

export default AuthLayout;


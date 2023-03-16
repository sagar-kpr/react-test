import FormWrapper from "./FormWrapper";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Dashboard, Login, Signup, Navbar } from "./index";
import { useState, useEffect } from "react";
import AuthLayout from "../layout/AuthLayout";

function App() {
  // const router = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(
    window.localStorage.getItem("loggedIn")
  );

  // useEffect(() => {
  //   if (!isLoggedin) router("/");
  // }, [isLoggedin]);

  return (
    <div className="App">
      {/* arstarstarst */}
      {/* {isLoggedin && <Navbar />} */}
      <Routes>
        <Route
          path="/"
          element={<Navigate to={!!isLoggedin ? "/dashboard" : "/login"} />}
        ></Route>
        <Route
          path="/dashboard"
          element={
            <AuthLayout>
              <Dashboard/>
            </AuthLayout>
          }
        ></Route>
        <Route
          path="/login"
          element={
            <FormWrapper>
              <Login setIsLoggedin={setIsLoggedin} />
            </FormWrapper>
          }
        ></Route>
        <Route
          path="/signup"
          element={
            <AuthLayout>
              <FormWrapper>
                <Signup />
              </FormWrapper>
            </AuthLayout>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;

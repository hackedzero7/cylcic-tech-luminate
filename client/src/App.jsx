import React, { useEffect } from "react";
import LandingPage from "./components/Landing-Page/Landing-Page";
import NavBar from "./components/NavBar/Navbar";
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import SignUp from "./components/Sign-Up/SignUp";
import SignIn from "./components/Login/Login";
import Alert from "./components/Alert/Alert";
import Dashboard from "./components/Dashboard/Dashboard";
import ForgotPassword from "./components/forgot-password/forgotpassword";
import UpdatePassword from "./components/UpdatePassword/UpdatePassword";
import setAuthToken from "./utils/setAuthCookie";
import { loadUser } from "./actions/auth";
import Cookies from "js-cookie";
import setAuthCookie from "./utils/setAuthCookie";
import PrivateRoutes from "./components/Routing/PrivateRoutes";
import SubScriptions from "./components/MultiStepForm/SubScriptions";
import CreateCustomer from "./components/MultiStepForm/CreateCustomer";
import CheckOutFormTwo from "./components/MultiStepForm/CheckOutForm";
import Confirmation from "./components/MultiStepForm/Confirmation";
import OrderSummary from "./components/MultiStepForm/OrderSummary";
import CreateAccount from "./components/MultiStepForm/SignUp";
import Payment from "./components/MultiStepForm/Payment";


 function App() {
  if (Cookies.get("token")) {
    // if there is a token set axios headers for all requests
    setAuthCookie(Cookies.get("token"));
  }

  useEffect(() => {
    store.dispatch(loadUser());
  }, [loadUser]);

 

  return (
    <>
      <Provider store={store}>
        <Router>
          <NavBar />

          <Alert />
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="/sign-up" element={<SignUp />} />
            <Route exact path="/sign-in" element={<SignIn />} />
            <Route exact path="/forgot-password" element={<ForgotPassword />} />
            <Route exact path="/payment" element={<Payment />} />
            <Route exact path="/subscription" element={<SubScriptions />} />
            <Route exact path="/create-account" element={<CreateAccount />} />
            <Route exact path="/checkout-form" element={<CheckOutFormTwo />} />
            <Route exact path="/confirmation" element={<Confirmation />} />
            <Route exact path="/create-customer" element={<CreateCustomer />} />
            <Route exact path="/order-summary" element={<OrderSummary />} />
            <Route
              exact
              path="/reset/:resetToken"
              element={<UpdatePassword />}
            />
                     
            <Route element={<PrivateRoutes/>}>
            <Route exact path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;




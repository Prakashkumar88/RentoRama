import { Route, Routes, useLocation, useMatch } from "react-router-dom";
import Home from "./Pages/Home";
import Services from "./Pages/Services";
import About from "./Pages/About";
import Review from "./Pages/Reviews";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignInPage from "./Pages/Auth/Signin";
import SignUpPage from "./Pages/Auth/Signup";
import OTPPage from "./Pages/Auth/OTP";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import UserProfile from "./Pages/Auth/UserProfile";
import PasswordReset from "./Pages/Auth/PasswordReset";

function App() {
  const location = useLocation();
  const matchResetPassword = useMatch("/account/reset-password-confirm/:id/:token");
  const isRequire =
    location.pathname === "/signin" ||
    location.pathname === "/signup" ||
    location.pathname === "/account/verify-email" || 
    location.pathname === "/signin/forgot-password" ||
    location.pathname === "/user"||
    matchResetPassword;

  return (
    <>
      {!isRequire && <Header />}
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/reviews" element={<Review />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/account/verify-email" element={<OTPPage />} />
        <Route path="/signin/forgot-password" element={<ForgotPassword />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/account/reset-password-confirm/:id/:token" element={<PasswordReset />} />
      </Routes>
      {!isRequire && <Footer />}
    </>
  );
}

export default App;

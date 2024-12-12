import { useLocation, Link } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { navigation } from "../constants/index";
import jeep from "../assets/jeep.svg";
import Button from "./design/Button";
import { IoList } from "react-icons/io5";
import { IconUser } from "@tabler/icons-react";
import { HamburgerMenu } from "./design/Hamburger";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const Header = () => {
  const BackendUrl = import.meta.env.VITE_BACKEND_URL;
  const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const isAuth = Cookies.get("is_auth");
      if (isAuth === "true") {
        setIsLoggedIn(true);
        try {
          const response = await axios.get(
            `${BackendUrl}/user/me`,
            { withCredentials: true }
          );
          setProfileImage(response.data.user.profileImage);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    checkAuthentication();
  }, []);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };

  const logout = async () => {
    try {
      // Make a POST request to the logout endpoint
      const response = await axios.post(
        `${BackendUrl}/user/logout`,
        {},
        { withCredentials: true }
      );
      if (response.data && response.data.status === "success") {
        // Redirect to the homepage after successful logout
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full z-50 lg:backdrop-blur-sm ${
          openNavigation ? "overflow-hidden bg-white" : "backdrop-blur-sm"
        }`}
      >
        <div className="flex flex-row items-center px-20 lg:px-7.5 xl:px-10 max-lg:py-4">
          <Link to="/">
            <img src={jeep} width={55} height={55} alt="jeep" />
          </Link>
          <nav
            className={`${
              openNavigation ? "flex" : "hidden"
            } fixed top-[5rem] left-0 right-0 bottom-0 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
          >
            <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
              {navigation.map((item) => (
                <Link to={item.url} key={item.id} onClick={handleClick}>
                  <span
                    className={`block relative font-code text-xl uppercase transition-colors font-bold ${
                      item.onlyMobile ? "lg:hidden" : ""
                    } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-bold ${
                      item.url === pathname.hash ? "z-2" : " "
                    }
                 lg:leading-5 sm:hover:text-n-1 xl:px-12`}
                  >
                    {item.title}
                  </span>
                </Link>
              ))}
            </div>
            <HamburgerMenu />
          </nav>
          {isLoggedIn ? (
            <>
              <Link to="/user">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="m-3 h-12 w-12 bg-gray-200 rounded-full"
                  />
                ) : (
                  <IconUser className="m-3 h-9 w-9 bg-gray-200 rounded-full" />
                )}
              </Link>
              <Button onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <Link
                to="signup"
                className="button hidden mr-8 font-bold transition-colors hover:text-n-1 lg:block"
              >
                New account
              </Link>
              <Link to="signin">
                <Button className="hidden lg:flex">Log In</Button>
              </Link>
            </>
          )}

          <Button
            className="ml-auto lg:hidden"
            px="px-3"
            onClick={toggleNavigation}
          >
            <IoList size={33} />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Header;

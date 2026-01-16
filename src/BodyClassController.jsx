// BodyBackgroundController.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function BodyBackgroundController() {
  const location = useLocation();

  useEffect(() => {
    const body = document.body;
    const metaTheme = document.querySelector('meta[name="theme-color"]');

    // Default background
    body.style.backgroundColor = "#101010";
    document.documentElement.style.backgroundColor = "#101010";
          if (metaTheme) {
        metaTheme.setAttribute('content', '#101010'); // change to red
      }


    if (location.pathname === "/plans") {
      console.log("Plans page");
    }
    if (location.pathname === "/auth") {
      if (metaTheme) {
        metaTheme.setAttribute('content', 'gray'); // change to red
      }
      body.style.backgroundColor = "gray"; 
      document.documentElement.style.backgroundColor = "gray";
      console.log("Auth page");
    }
  }, [location.pathname]);

  return null; // renders nothing
}

// BodyBackgroundController.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function BodyBackgroundController() {
  const location = useLocation();

  useEffect(() => {
    const body = document.body;

    // Default background
    body.style.backgroundColor = "#101010";
    document.documentElement.style.backgroundColor = "#101010";

    if (location.pathname === "/plans") {
      console.log("Plans page");
    }
    if (location.pathname === "/auth") {
      body.style.backgroundColor = "gray"; 
      document.documentElement.style.backgroundColor = "gray";
      console.log("Auth page");
    }
  }, [location.pathname]);

  return null; // renders nothing
}

import { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { Box } from "@mui/material";
import logo from "../pics/penny.png";

const Animation = () => {
  const [showApp, setShowApp] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowApp(true);
    }, 2000);
  }, []);

  const logoAnimation = useSpring({
    opacity: showApp ? 0 : 1,
    transform: showApp ? "scale(1)" : "scale(4)",
  });

  const backgroundAnimation = useSpring({
    opacity: showApp ? 0 : 1,
    config: { duration: 2000 },
  });

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#9686AB",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <animated.div style={backgroundAnimation}></animated.div>
      <animated.div style={logoAnimation}>
        <img src={logo} alt="logo" />
      </animated.div>
    </Box>
  );
};

export default Animation;

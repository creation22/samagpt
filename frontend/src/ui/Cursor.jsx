// ui/CustomCursor.jsx
import { useEffect, useState } from "react";
import cursorImg from "../assets/pointer.png"; // put your PNG here

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <img
      src={cursorImg}
      alt="cursor"
      className="fixed pointer-events-none z-[9999]"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
        width: "32px", // adjust size
        height: "32px",
      }}
    />
  );
};

export default CustomCursor;

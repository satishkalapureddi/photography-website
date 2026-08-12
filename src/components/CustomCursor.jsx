import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({
    x: -100,
    y: -100,
  });

  const [hovering, setHovering] =
    useState(false);

  useEffect(() => {
    const move = (event) => {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    const enter = () => setHovering(true);
    const leave = () => setHovering(false);

    window.addEventListener(
      "mousemove",
      move
    );

    const interactive =
      document.querySelectorAll(
        "a, button, img"
      );

    interactive.forEach((element) => {
      element.addEventListener(
        "mouseenter",
        enter
      );

      element.addEventListener(
        "mouseleave",
        leave
      );
    });

    return () => {
      window.removeEventListener(
        "mousemove",
        move
      );

      interactive.forEach((element) => {
        element.removeEventListener(
          "mouseenter",
          enter
        );

        element.removeEventListener(
          "mouseleave",
          leave
        );
      });
    };
  }, []);

  return (
    <div
      className={
        hovering
          ? "custom-cursor cursor-hover"
          : "custom-cursor"
      }
      style={{
        left: position.x,
        top: position.y,
      }}
    />
  );
}
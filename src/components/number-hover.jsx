import { useState, useRef } from "react";

function HoverCounter({ target }) {
   const [value, setValue] = useState(target);   
  const running = useRef(false);

  const animate = () => {
    let start = 0;
    const end = target;
    const duration = 800;
    const step = end / (duration / 16);

    function update() {
      start += step;
      if (start >= end) {
        setValue(end);
        running.current = false;
        return;
      }
      setValue(Math.floor(start));
      requestAnimationFrame(update);
    }

    update();
  };

  return (
    <span
      onMouseEnter={() => {
        if (!running.current) {
          running.current = true;
          animate();
        }
      }}
    >
      {value.toLocaleString()}
    </span>
  );
}

export default HoverCounter;

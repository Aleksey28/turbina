import React from 'react';
import { uid } from 'react-uid';

export default function Ripple({
  duration = 850,
  firstColor = 'rgba(44,94,121,1)',
  secondColor = 'rgba(212,159,177,1)',
  size = 100,
  children,
}) {
  const [rippleArray, setRippleArray] = React.useState([]);

  React.useEffect(() => {
    let bounce;

    if (rippleArray.length) {
      window.clearTimeout(bounce);

      bounce = window.setTimeout(() => {
        setRippleArray([]);
        window.clearTimeout(bounce);
      }, duration * 2);
    }

    return () => window.clearTimeout(bounce);
  }, [rippleArray.length, duration]);

  const addRipple = (event) => {
    const x = event.pageX - offsetLeft(event.currentTarget) - size / 2;
    const y = event.pageY - size / 2;

    const newRipple = {
      x,
      y,
      size,
    };

    setRippleArray([...rippleArray, newRipple]);
  };

  return (
    <div className="page-ripple" onMouseDown={addRipple}>
      {rippleArray.length
        ? rippleArray.map((ripple, index) => {
            return (
              <span
                className="page-ripple__item"
                key={uid(ripple)}
                style={{
                  top: ripple.y,
                  left: ripple.x,
                  width: ripple.size,
                  height: ripple.size,
                  backgroundImage: `radial-gradient(circle, ${firstColor} 0%, ${secondColor}100%)`,
                  boxShadow: `0 0 6px 3px ${secondColor}`,
                  animationDuration: `${duration}ms`,
                }}
              />
            );
          })
        : ''}

      {children}
    </div>
  );
}

function offsetLeft(el) {
  var left = 0;
  while (el && el !== document) {
    left += el.offsetLeft;
    el = el.offsetParent;
  }
  return left;
}

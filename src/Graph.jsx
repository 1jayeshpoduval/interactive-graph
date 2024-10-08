import React from "react";
import { useRef, useState, useEffect } from "react";
const Graph = ({ setTime, timeFormat, duration }) => {
  const pathGradient =
    "M34.8359 46.7892C19.5125 36.9385 9.84413 52.2619 2 57.7346V308H602.897V49.5256C598.518 71.9634 591.951 111.366 570.061 117.386C555.804 121.307 565.135 57.1873 544.339 69.7744C525.732 84.0033 513.058 77.3155 506.031 67.5853C491.802 47.8838 474.432 86.872 472.1 69.7744C463.891 9.57526 464.439 -6.29532 444.19 5.7444C423.941 17.7842 434.696 41.669 410.259 34.2022C390.558 28.1823 397.125 88.9286 382.349 98.7794C372.025 105.662 358.817 81.2669 346.777 74.1525C325.981 61.8639 315.035 113.008 300.807 120.67C286.578 128.332 263.045 126.143 255.384 93.854C248.269 71.9634 235.545 5.74438 223.095 55.5455C212.697 97.1376 198.468 113.008 185.334 105.347C177.298 100.659 170.558 80.7197 157.423 83.456C144.029 86.2464 137.174 109.177 120.756 105.347C97.6176 99.9475 116.378 53.3564 95.035 42.4111C79.479 34.4337 76.3057 72.2325 66.03 78.5306C49.0648 88.9286 45.9797 53.9531 34.8359 46.7892Z";
  const path =
    "M2 57.7346C9.84413 52.2619 19.5125 36.9385 34.8359 46.7892C45.9797 53.9531 49.0648 88.9286 66.03 78.5306C76.3057 72.2325 79.479 34.4337 95.035 42.4111C116.378 53.3564 97.6176 99.9475 120.756 105.347C137.174 109.177 144.029 86.2464 157.423 83.456C170.558 80.7196 177.298 100.659 185.334 105.347C198.468 113.008 212.697 97.1376 223.095 55.5455C235.545 5.74438 248.269 71.9634 255.384 93.854C263.045 126.143 286.578 128.332 300.807 120.67C315.035 113.008 325.981 61.8639 346.777 74.1525C358.817 81.2669 372.025 105.662 382.349 98.7794C397.125 88.9286 390.558 28.1823 410.259 34.2022C434.696 41.669 423.941 17.7842 444.19 5.7444C464.439 -6.29532 463.891 9.57526 472.1 69.7744C474.432 86.872 491.802 47.8838 506.031 67.5853C513.058 77.3155 525.732 84.0033 544.339 69.7744C565.135 57.1873 555.804 121.307 570.061 117.386C591.951 111.366 598.519 71.9634 602.897 49.5256";

  const dotSize = "20";

  const [dotDistance, setDotDistance] = useState(0);
  const [indicatorPosition, setIndicatorPosition] = useState(0);
  const [clipPathPosition, setClipPathPosition] = useState(0);

  const clipPath = `inset(0 ${clipPathPosition}px 0  0)`;

  const calculateGraphBounds = () => {
    const { width, left } = graphRef.current.getBoundingClientRect() ?? {
      left: 0,
      width: 0,
    };
    return { width, left };
  };

  useEffect(() => {
    const { width: graphWidth } = calculateGraphBounds();
    setClipPathPosition(graphWidth);
  }, []);

  const graphRef = useRef(null);
  const dotRef = useRef(null);

  const handleMouseMove = (e) => {
    const dotBounds = dotRef.current.getBoundingClientRect() ?? { x: 0 };
    const { width: graphWidth, left: graphLeft } = calculateGraphBounds();

    const dotMiddle = dotBounds.x + dotSize / 2;
    const dotX = ((e.pageX - graphLeft) / graphWidth) * 100;
    const clipPathX = graphWidth - (dotMiddle - graphLeft);
    const indicatorX = dotMiddle - graphLeft;

    const timeProgress = ((e.pageX - graphLeft) / graphWidth) * duration;
    const clampedTimeProgress = clamp(timeProgress);

    setTime(Math.floor(clampedTimeProgress));
    setDotDistance(dotX);
    setClipPathPosition(clipPathX);
    setIndicatorPosition(indicatorX);
  };

  const clamp = (timeProgress) => {
    return Math.min(Math.max(timeProgress, 0), duration);
  };

  return (
    <div
      ref={graphRef}
      className="relative hover:cursor-none"
      onMouseMove={handleMouseMove}
    >
      <div
        className="absolute z-10 rounded-full border-[3px] border-[#e0e0e0] bg-[#8134FF]"
        ref={dotRef}
        style={{
          height: `${dotSize}px`,
          width: `${dotSize}px`,
          offsetPath: `path('${path}')`,
          offsetDistance: `${dotDistance}%`,
        }}
      ></div>
      <div
        className="absolute h-[80%]"
        style={{
          transform: `translateX(${indicatorPosition}px)`,
        }}
      >
        <div className="absolute -top-16 h-[120%] w-0.5 bg-[#A670FF]">
          <div className="absolute -translate-x-1/2 whitespace-nowrap rounded-full bg-[#A670FF] px-4 py-1">
            <span>{timeFormat} AM</span>
          </div>
        </div>
      </div>
      <svg
        width="605"
        height="308"
        viewBox="0 0 605 308"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={pathGradient} fill="url(#paint0_linear_444_406)" />
        <path d={path} stroke="#BBBBBB" strokeWidth="3" strokeLinecap="round" />
        <path
          d={pathGradient}
          fill="url(#paint1_linear_444_406)"
          style={{ clipPath: clipPath }}
        />
        <path
          d={path}
          stroke="#8134FF"
          strokeWidth="3"
          strokeLinecap="round"
          style={{ clipPath: clipPath }}
        />
        <defs>
          <linearGradient
            id="paint0_linear_444_406"
            x1="302.448"
            y1="2"
            x2="302.448"
            y2="308"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#CFCFCF" />
            <stop offset="0.733837" stopColor="#E0E0E0" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_444_406"
            x1="302.448"
            y1="2"
            x2="302.448"
            y2="308"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#D0B2FF" />
            <stop offset="0.698837" stopColor="#E0E0E0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default Graph;

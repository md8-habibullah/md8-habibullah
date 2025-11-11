import React, { useState, useEffect } from "react";

const HackerText = ({ text, className }) => {
  const [displayedText, setDisplayedText] = useState("");
  const letters = "xh2~E#!katW~AtySywq@(1Yi+o8~L[Sw$";

  useEffect(() => {
    let iteration = 0;
    const steps = 50; // Number of iterations
    const intervalTime = 25; // ms per frame

    const interval = setInterval(() => {
      setDisplayedText(
        text
          .split("")
          .map((char, index) => {
            if (index < Math.floor(iteration)) return char;
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("")
      );

      iteration += text.length / steps;

      if (iteration >= text.length) clearInterval(interval);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [text]);

  return <p className={className}>{displayedText}</p>;
};

export default HackerText;

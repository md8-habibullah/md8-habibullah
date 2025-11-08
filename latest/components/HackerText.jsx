import React, { useState, useEffect } from 'react';

const HackerText = ({ text, className }) => {
  const [displayedText, setDisplayedText] = useState('');
  const letters = "xh2~E#!katW~AtySywq@(1Yi+o8~L[Sw$";

  useEffect(() => {
    let iteration = 0;
    
    // Clear any existing intervals
    let interval = setInterval(() => {
      setDisplayedText(
        text
          .split("")
          .map((letter, index) => {
            // If the index is already "decrypted", keep the original letter
            if(index < iteration) {
              return text[index];
            }
            
            // Otherwise, show a random scrambling letter
            return letters[Math.floor(Math.random() * letters.length)]
          })
          .join("")
      );
      
      // Stop scrambling after we've passed the full length
      if(iteration >= text.length){
        clearInterval(interval);
      }
      
      // Control the speed of decryption
      // CHANGED: Use 50 steps
      iteration += text.length / 50; 
    }, 31); // CHANGED: Use 31ms interval (50 / 31 ≈ 1.613)

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [text]); // Re-run effect if the text prop changes

  return (
    <p className={className}>
      {displayedText}
    </p>
  );
};

export default HackerText;
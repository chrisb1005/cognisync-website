import React, { useEffect, useState } from 'react';
import './TypingEffect.css'; // Import your CSS file

const TypingEffect = ({ text }) => {
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false); // Reset isVisible when scrolling back to the top
        setTypedText(''); // Reset typedText when scrolling back to the top
        setCurrentIndex(0); // Reset currentIndex when scrolling back to the top
        setIsTypingComplete(false); // Reset isTypingComplete when scrolling back to the top
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      if (currentIndex < text.length) {
        const typingTimer = setInterval(() => {
          setTypedText((prevTypedText) => prevTypedText + text[currentIndex]);
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }, 50); // Adjust the typing speed here (in milliseconds)

        return () => clearInterval(typingTimer);
      } else {
        setIsTypingComplete(true);
      }
    }
  }, [currentIndex, text, isVisible]);

  return (
    <div className="typing-section">
      <p id="typing-text">{typedText}</p>
      {isTypingComplete}
    </div>
  );
};

export default TypingEffect;

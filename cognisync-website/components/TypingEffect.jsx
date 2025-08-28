import React, { useEffect, useState } from 'react';
import styles from './MissionStatement.module.css';

const TypingEffect = ({ text, speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  return (
    <div className={styles.typingText}>
      <span>{displayedText}</span>
      {index < text.length && <span className={styles.caret} />}
    </div>
  );
};

export default TypingEffect;

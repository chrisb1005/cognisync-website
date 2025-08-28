import React from 'react';
import TypingEffect from './TypingEffect';
import styles from './MissionStatement.module.css';

const Mission = () => {
  const textToType =
    'We help startups and agencies connect their tools and data so they can move faster, work smarter, and scale with ease.';

  return (
    <div className={styles.typingSection}>
      <TypingEffect text={textToType} />
    </div>
  );
};

export default Mission;

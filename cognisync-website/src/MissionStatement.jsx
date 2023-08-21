import React from 'react';
import TypingEffect from './TypingEffect';

const Mission = () => {
  const textToType = "Unlock the limitless potential of your business with CogniSync, your gateway to harnessing cutting-edge AI solutions that supercharge efficiency, fuel innovation, and propel growth.";

  return (
    <div className='mission-statement'>
      {/* Other content */}
      <TypingEffect text={textToType} />
      {/* More content */}
    </div>
  );
};

export default Mission;

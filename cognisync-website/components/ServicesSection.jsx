import React, { useEffect } from 'react';

import TRUNK from 'vanta/src/vanta.globe';

const ServicesSection = () => {
  useEffect(()=>{
    TRUNK({
      el:'#services',
      mouseControls: false,
      touchControls: false,
      scale: 1,
      minHeight: 650,
      minWidth: 300,
      backgroundColor: 0xffffff,
      color: 0x0,


    })
  }, [])
  return (
    <div className="services-section" id='services-section'>
      <div className='services-header'><h1>Services</h1></div>
      <div class="services-container"id='services'>
  <div class="service-card">
    <h2 class="service-title">Workflow Automation</h2>
    <ul>
    <li class="service-description">We streamline daily processes, cut manual work, and give your team back valuable time.</li>

<li><strong>Why it matters:</strong> Free up your team to focus on growth, not repetitive busywork.</li>
</ul>
  </div>
  
  <div class="service-card">
    <h2 class="service-title">App & Tool Integration</h2>
    <ul>
    <li class="service-description">We connect your favorite apps and platforms so your team spends less time switching and more time creating.</li>

<li><strong>Why it matters:</strong> No more broken processes or copy-paste chaos — your tools finally work together.</li>
</ul>
  </div>
  
  <div class="service-card">
    <h2 class="service-title">Custom API Development</h2>
    <ul>
    <li class="service-description">We build lightweight, flexible APIs to connect the systems your business depends on.</li>
    <span></span>
    <span></span>

<li><strong>Why it matters:</strong> Scale without limits by linking platforms in exactly the way your business needs.</li>
</ul>
  </div>
  </div>


      {/* Add your content for the Services section */}
    </div>
  );
};

export default ServicesSection;

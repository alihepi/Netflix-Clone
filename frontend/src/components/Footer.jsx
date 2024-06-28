import React from 'react';

const Footer = () => {
  const openLink = () => {
    window.open('https://www.alimutlu.net', '_blank');
  };

  return (
    <div className='footer col-12 d-flex flex-column align-items-center justify-content-center'>
      <div className='opacity-50' onClick={openLink} style={{cursor: 'pointer'}}>
        Ali Mutlu | alihappy
      </div>
    </div>
  );
};

export default Footer;

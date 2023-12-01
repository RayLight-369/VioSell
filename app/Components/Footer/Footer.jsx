import React from 'react';
import styles from "./Footer.module.css";
import Image from 'next/image';

const Footer = () => {
  return (
    <div className={ styles[ "footer" ] }>
      <div className={ styles[ "body" ] }>
        <div className={ styles[ "title" ] }>
          <Image
            src={ "/Images/footer-icon.svg" }
            width={ 400 }
            height={ 120 }
            alt='footer'
          />
          <a className={ styles[ "email" ] } href='mailto:abdulrafay.designs@gmail.com'>abdulrafay.designs@gmail.com</a>
        </div>
      </div>
      <p className={ styles[ "copyright" ] }></p>
    </div>
  );
};

export default Footer;
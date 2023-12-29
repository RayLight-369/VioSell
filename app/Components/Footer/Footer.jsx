import React from 'react';
import styles from "./Footer.module.css";
import Image from 'next/image';
import { usePathname } from "next/navigation";

const Footer = () => {
  return (
    <footer className={ styles[ "footer" ] }>
      <div className={ styles[ "body" ] }>
        <div className={ styles[ "title" ] }>
          <Image
            src={ "/Images/footer-icon.svg" }
            width={ 250 }
            height={ 75 }
            alt='footer'
          />
          <a className={ styles[ "email" ] } href='mailto:abdulrafay.designs@gmail.com'>abdulrafay.designs@gmail.com</a>
        </div>
        <div className={ styles[ "update" ] }>
          <p className={ styles[ "title" ] }>
            Stay up to date from VioSell on Internet
          </p>
          <div className={ styles[ "inputs" ] }>
            <input type="text" placeholder='Enter your E-mail' className={ styles[ 'email-input' ] } />
            <input type="button" className={ styles[ 'sign-up' ] } defaultValue={ "Sign-up" } />
          </div>
        </div>
      </div>
      <p className={ styles[ "copyright" ] }>
        Copyright © 2022 VioSell, Inc
      </p>
    </footer>
  );
};

export default Footer;
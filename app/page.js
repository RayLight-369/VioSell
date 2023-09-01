"use client";

import { useEffect, useState } from "react";
import Feed from "./Components/Feed/Feed";
import styles from "./Home.module.css"; // Import the module CSS file

const Home = () => {

  useEffect(() => {
    // Apply the background class to the body element only for the home page
    document.body.classList.add(styles.bodyBackground);
    document.querySelector("main").classList.add(styles["main-element"]);

    // Clean up the class when the component unmounts (optional)
    return () => {
      document.body.classList.remove(styles.bodyBackground);
      document.querySelector("main").classList.remove(styles["main-element"]);
    };
  }, []);

  return (
    <>
      <section id={styles.main}>
        <h1 className={`${styles.title}`}>
          <span className={styles.span}>VioSell: </span>
          <br /> Your Objects, Your Marketplace.
        </h1>
        <p className={styles.desc}>
          Your premier online marketplace, offering a curated platform where you
          can confidently present your objects, connect with buyers, and unlock
          the potential for thriving sales.
        </p>
      </section>
      <hr className={styles.hr} />
      <Feed />
    </>
  );
};

export default Home;

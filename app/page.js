"use client";

import { useEffect, useState } from "react";
import Feed from "./Components/Feed";
import "./styles/Home.css";

const Home = () => {

  return (
    <>
      <section id="main">
        <h1 className="title"><span>VioSell: </span><br /> Your Objects, Your Marketplace.</h1>
        <p className="desc">Your premier online marketplace, offering a curated platform where you can confidently present your objects, connect with buyers, and unlock the potential for thriving sales.</p>
      </section>
      <hr/>
      <Feed
        type={"featured"}
      />
    </>
  )
}

export default Home;
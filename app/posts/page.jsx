import React from "react";
import Feed from "../Components/Feed/Feed";

import styles from "./posts.module.css";

const page = () => {
  return (
    <section id={styles["feed"]}>
      <Feed type={"all"} searchBar />
    </section>
  );
};

export default page;

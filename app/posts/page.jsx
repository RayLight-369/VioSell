"use client";

import { useEffect, useState } from "react";
import Feed from "../Components/Feed/Feed";

import styles from "./posts.module.css";

const page = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);

  const handleSearch = async (e, Range, filter) => {
    if (e.key == "Enter" && query.trim().length) {
      const request = await fetch("/api/posts/search", {
        method: "POST",
        body: JSON.stringify({
          query,
          range: Range,
          filter: filter ? filter : "relevance",
        }),
      });

      if (request.ok) {
        let body = await request.json();
        console.log(body);
        setData(body.data);
      }
    }
  };

  useEffect(() => {
    if (!query.trim().length) {
      setData([]);
    }
  }, [query]);

  return (
    <section id={styles["feed"]}>
      <Feed
        type={"all"}
        data={data.length ? data : null}
        range={[0, 19]}
        newPostsWhileScrolling={true}
        searchBar
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
      />
    </section>
  );
};

export default page;

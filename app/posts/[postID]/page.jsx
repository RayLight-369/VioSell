"use client";

import ImageComponent from "@/app/Components/ImageComponent/ImageComponent";
import { useEffect, useState } from "react";

import styles from "./page.module.css";

const Post = ({ params }) => {
  let { postID } = params;
  let [post, setPost] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      const data = await (await fetch(`/api/posts/${postID}`)).json();
      console.log(data);
      setPost((prev) => ({ ...prev, ...data }));
    };

    fetchPost();
    console.log("post: ", post);
  }, []);

  return (
    <section className={styles["post-page"]}>
      <ImageComponent
        style={{
          top: 90,
          left: 30,
        }}
        images={post.images}
      />
    </section>
  );
};

export default Post;

"use client";

import ImageComponent from "@/app/Components/ImageComponent/ImageComponent";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faUser } from "@fortawesome/free-solid-svg-icons";

import styles from "./page.module.css";
import Image from "next/image";

const Post = ({ params }) => {
  const { postID } = params;
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});
  const [pfp, setPfp] = useState("/Images/favicon.svg");
  const [loading, setLoading] = useState(true);
  const [ImageComponentWidth, setImageComponentWidth] = useState(0);
  const [ImageComponentHeight, setImageComponentHeight] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await (await fetch(`/api/posts/${postID}`)).json();
        console.log(postData);

        setImageComponentWidth(550);
        setImageComponentHeight(480);

        setPost((prev) => ({ ...prev, ...postData }));

        const userData = await (
          await fetch(`/api/users/${postData.userID}`)
        ).json();

        console.log(userData);
        setPfp(userData.image);
        setUser((prev) => ({ ...prev, ...userData }));
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
    console.log("post: ", post);
  }, [postID]);

  let content;

  if (loading) {
    content = <p>Loading...</p>;
  } else {
    content = (
      <>
        <p className={styles["title"]}>
          {post.title.length > 50
            ? post.title.substring(0, 50) + "..."
            : post.title}
        </p>
        <section className={styles["images-info"]}>
          <ImageComponent
            images={post.images}
            width={ImageComponentWidth}
            height={ImageComponentHeight}
            className={styles["image-component"]}
          />

          <div className={styles["info"]}>
            <div className={styles["profile"]}>
              <div className={styles["image-info"]}>
                <div className={styles["pfp"]}>
                  <Image width={20} height={20} alt="user image" src={pfp} />
                </div>
                <div className={styles["user-info"]}>
                  <p className={styles["username"]}>{user?.name || "User"}</p>
                  <p className={styles["date"]}>
                    Member since {user?.created_at || "9-Sep 2023"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return <section className={styles["post-page"]}>{content}</section>;
};

export default Post;

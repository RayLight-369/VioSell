"use client";

import ImageComponent from "@/app/Components/ImageComponent/ImageComponent";
import { memo, useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIdCard,
  faLocationDot,
  faMoneyBill1,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import useSWR from "swr";

import styles from "./page.module.css";
import Image from "next/image";
import Feed from "@/app/Components/Feed/Feed";
import { useSession } from "next-auth/react";
// import { getUser } from "@/Provider/Provider";

const ContactSection = memo(({ post }) => {
  const [contactAppear, setContactAppear] = useState(false);
  const [copied, setCopied] = useState(false);
  const { data: session, status } = useSession();
  const handleClick = () => setContactAppear(true);

  let content;
  useEffect(() => console.log(session), [session]);
  if (session?.user.id) {
    content = (
      <>
        <FontAwesomeIcon className={styles["phone-icon"]} icon={faPhone} />
        {copied ? "Copied!!" : post.contact}
      </>
    );
  } else {
    content = "Login First";
  }

  return (
    <>
      {contactAppear ? (
        <p
          className={styles["contact"]}
          onClick={() => {
            navigator.clipboard
              .writeText(
                content != "Login First" ? post.contact : "I Said Login First!"
              )
              .then(() => {
                setCopied(true);
                let timeOut = setTimeout(() => {
                  setCopied(false);
                  clearTimeout(timeOut);
                }, 2000);
              })
              .catch(console.log);
          }}
        >
          {content}
        </p>
      ) : (
        <button
          type="button"
          className={styles["contact-display-btn"]}
          onClick={() => handleClick()}
        >
          <FontAwesomeIcon className={styles["phone-icon"]} icon={faPhone} />
          Show Contact Number
        </button>
      )}
    </>
  );
});

const fetcher = (url) => fetch(url).then((res) => res.json());

const relatedFetcher = ([url, options]) =>
  fetch(url, options).then((res) => res.json());

const Post = ({ params }) => {
  const { postID } = params;
  const [pfp, setPfp] = useState("/Images/favicon.svg");
  const [loading, setLoading] = useState(true);
  const [ImageComponentWidth, setImageComponentWidth] = useState(0);
  const [ImageComponentHeight, setImageComponentHeight] = useState(0);
  const [session, setSession] = useState({});

  const {
    data: post,
    error: postError,
    isLoading: postLoading,
  } = useSWR(`/api/posts/${postID}`, fetcher);
  // Only fetch user data if post data is available
  const {
    data: user,
    error: userError,
    isLoading: userLoading,
  } = useSWR(
    post ? `/api/users/${post.userID}` : null, // Pass null if post data is not available
    fetcher
  );

  const { data: relatedPosts } = useSWR(
    post
      ? [
          `/api/posts/tags`,
          {
            method: "POST",
            body: JSON.stringify({
              tags: post.tags.split(" ").join("-"),
              range: [0, 5],
            }),
          },
        ]
      : null,
    relatedFetcher
  );

  // useEffect(() => {
  //   getUser().then(({ session, signedIn }) => {
  //     console.log(session ?? {});
  //     if (signedIn) {
  //       setSession(session);
  //     } else {
  //       setSession(null);
  //     }
  //   });
  // }, []);

  useEffect(() => {
    setImageComponentWidth(550);
    setImageComponentHeight(480);
    setLoading(postLoading);
    if (user?.image) {
      setPfp(user.image);
    }
    console.log(relatedPosts);
  }, [user]);

  // useEffect( () => {
  //   const fetchPost = async () => {
  //     try {
  //       const postData = await ( await fetch( `/api/posts/${ postID }` ) ).json();
  //       console.log( postData );

  //       setImageComponentWidth( 550 );
  //       setImageComponentHeight( 480 );

  //       setPost( ( prev ) => ( { ...prev, ...postData } ) );

  //       const userData = await (
  //         await fetch( `/api/users/${ postData.userID }` )
  //       ).json();

  //       console.log( userData );
  //       setPfp( userData.image );
  //       setUser( ( prev ) => ( { ...prev, ...userData } ) );
  //     } catch ( e ) {
  //       console.log( e );
  //     } finally {
  //       setLoading( false );
  //     }
  //   };

  //   fetchPost();
  //   console.log( "post: ", post );
  // }, [ postID ] );

  let content;
  let contactContent;

  // const contactDisplay = useMemo( () => {
  //   if ( contactAppear ) {
  //     return <p className={ styles[ "contact" ] }>{ post.contact }</p>;
  //   } else {
  //     return (
  //       <button
  //         type="button"
  //         className={ styles[ "contact-display-btn" ] }
  //         onClick={ () => setContactAppear( true ) }
  //       >
  //         Show Contact Number
  //       </button>
  //     );
  //   }
  // }, [ contactAppear ] );

  if ((postLoading || userLoading) && !post) {
    content = <p>Loading...</p>;
  } else {
    content = post?.title ? (
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
                  <ContactSection post={post} />
                </div>
              </div>
              <div className={styles["location"]}>
                <p className={styles["location"]}>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className={styles["location-icon"]}
                  />
                  <span>{post.location}</span>
                </p>
              </div>
              <div className={styles["price"]}>
                <p className={styles["price"]}>
                  <FontAwesomeIcon
                    icon={faMoneyBill1}
                    className={styles["price-icon"]}
                  />
                  <span>{post.price}</span>
                </p>
              </div>
              <div className={styles["ad-id"]}>
                <p className={styles["ad-id"]}>
                  <FontAwesomeIcon
                    icon={faIdCard}
                    className={styles["ad-id-icon"]}
                  />
                  <span>AD-ID: {" " + post.id}</span>
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className={styles["description"]}>
          <div className={styles["description"]}>
            <h1 className={styles["desc-title"]}>Description</h1>
            <p className={styles["description"]}>{post.description}</p>
          </div>
        </section>
        <h1 className={styles["related-posts-title"]}>Related Posts</h1>
        {relatedPosts && (
          <Feed data={relatedPosts} className={styles["feed"]} />
        )}
      </>
    ) : (
      <p>No Post with this ID.</p>
    );
  }

  return <section className={styles["post-page"]}>{content}</section>;
};

export default Post;

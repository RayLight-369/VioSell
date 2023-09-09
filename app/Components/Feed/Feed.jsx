"use client";

import React, { useEffect, useState } from "react";
import PostCard from "../PostCard/PostCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import styles from "./Feed.module.css";

const PostCardList = ({ data }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleEdit = (post) => {
    if (session?.user.id === post.userID) {
      router.push(`/edit-post/${post.id}`);
    }
  };

  const handlePostClick = (post) => {
    router.push(`/posts/${post.id}`);
  };

  const handleTagClick = (tags) => {
    router.push(`/posts/tags?tag=${tags.join("-")}`);
  };

  const handleDelete = (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this Post?");

    if (hasConfirmed) {
      fetch(`/api/posts/${post.id}`, {
        method: "DELETE",
      })
        .then(() => router.refresh())
        .catch((error) => console.error("Error deleting post:", error));
    }
  };

  return (
    <div id={styles["posts-list"]}>
      {data.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          handlePostClick={handlePostClick}
          handleTagClick={handleTagClick}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      ))}
    </div>
  );
};

const Feed = ({ type, user_ID }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let url = user_ID ? `/api/users/${user_ID}/posts` : `/api/posts`;
        const response = await fetch(url);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user_ID]);

  let content;

  if (loading) {
    content = <p>Loading...</p>;
  } else if (posts.length === 0) {
    if (!user_ID) {
      content = <p>Please try again later.</p>;
    } else {
      content = <p>User has no posts.</p>;
    }
  } else {
    content = <PostCardList data={posts} handleTagClick={() => {}} />;
  }

  return <section id={styles.feed}>{content}</section>;
};

export default Feed;

// "use client";

// import React, { useEffect, useState } from "react";
// import PostCard from "../PostCard/PostCard";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

// import styles from "./Feed.module.css";

// const PostCardList = ({ data, handleTagClick }) => {
//   const { data: session } = useSession();
//   const router = useRouter();

//   const handleEdit = (post) => {
//     if (session?.user.id === post.userID) {
//       router.push(`/edit-post/${post.id}`);
//     }
//   };

//   const handlePostClick = (post) => {
//     router.push(`/posts/${post.id}`);
//   };

//   const handleDelete = (post) => {
//     const hasConfirmed = confirm("Are you sure you want to delete this Post?");

//     if (hasConfirmed) {
//       console.log(hasConfirmed, post.id);

//       fetch(`/api/posts/${post.id}`, {
//         method: "DELETE",
//       }).then(() => {
//         router.refresh();
//       });
//     }
//   };

//   return (
//     <div id={styles["posts-list"]}>
//       {data.map((post) => (
//         <PostCard
//           key={post.id}
//           post={post}
//           handlePostClick={handlePostClick}
//           handleTagClick={handleTagClick}
//           handleDelete={handleDelete}
//           handleEdit={handleEdit}
//         />
//       ))}
//     </div>
//   );
// };

// const Feed = ({ type, user_ID }) => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         let url = user_ID ? `/api/users/${user_ID}/posts` : `/api/posts`;

//         const response = await fetch(url);
//         const data = await response.json();

//         setPosts(data);
//         console.log(data); // console.log
//       } catch (e) {
//         console.log(e);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   let content;

//   if (loading) {
//     content = <p>Loading...</p>;
//   }

//   if (!user_ID) {
//     if (!loading && posts.length > 0) {
//       content = <PostCardList data={posts} handleTagClick={() => {}} />;
//     } else {
//       content = <p>Please Rety Later.</p>;
//     }
//   } else {
//     if (!loading && posts.length > 0) {
//       content = <PostCardList data={posts} handleTagClick={() => {}} />;
//     } else {
//       content = <p>User have no Posts.</p>;
//     }
//   }

//   return <section id={styles.feed}>{content}</section>;
// };

// export default Feed;

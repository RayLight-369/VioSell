"use client";

import React, { useEffect, useState, useMemo } from "react";
import PostCard from "../PostCard/PostCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import styles from "./Feed.module.css";
import { deleteAllFiles, deleteFile } from "@/app/Supabase/Supabase";

const PostCardList = ( { data, setPosts } ) => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleEdit = ( post ) => {
    if ( session?.user.id === post.userID ) {
      router.push( `/edit-post/${ post.id }` );
    }
  };

  const handlePostClick = ( post ) => {
    router.push( `/posts/${ post.id }` );
  };

  const handleTagClick = ( tags ) => {
    router.push( `/posts/tags?tag=${ tags.join( "-" ) }` );
  };

  const handleDelete = ( post ) => {
    const hasConfirmed = confirm( "Are you sure you want to delete this Post?" );

    if ( hasConfirmed ) {
      fetch( `/api/posts/${ post.id }`, {
        method: "DELETE",
      } )
        .then( async () => {
          setPosts( ( prev ) => [ ...prev.filter( ( p ) => p.id != post.id ) ] );
          await deleteAllFiles( `users/${ session?.user.id }/${ post.id }` );
        } )
        .then( () => router.refresh() )
        .catch( ( error ) => console.error( "Error deleting post:", error ) );
    }
  };

  return (
    <div id={ styles[ "posts-list" ] }>
      { data.map( ( post ) => (
        <PostCard
          key={ post.id }
          post={ post }
          handlePostClick={ handlePostClick }
          handleTagClick={ handleTagClick }
          handleDelete={ handleDelete }
          handleEdit={ handleEdit }
        />
      ) ) }
    </div>
  );
};

// const Feed = ({ type, user_ID, searchBar = false, data = [] }) => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         let url = user_ID ? `/api/users/${user_ID}/posts` : `/api/posts`;
//         const response = await fetch(url, {
//           cache: "no-store",
//           next: {
//             revalidate: 10 * 60,
//           },
//         });
//         const Data = await response.json();
//         setPosts(Data);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (data?.length) {
//       setPosts(data);
//       setLoading(false);
//     } else {
//       fetchPosts();
//     }
//   }, [user_ID, searchBar, data]);

//   let content;

//   if (loading) {
//     content = <p>Loading...</p>;
//   } else if (posts.length === 0) {
//     if (!user_ID) {
//       content = <p>Please try again later.</p>;
//     } else {
//       content = <p>User has no posts.</p>;
//     }
//   } else {
//     content = (
//       <PostCardList
//         setPosts={setPosts}
//         data={posts}
//         handleTagClick={() => {}}
//       />
//     );
//   }

//   return (
//     <section id={styles.feed}>
//       {searchBar && (
//         <form className={styles["form"]}>
//           <input
//             type="text"
//             placeholder="Search Post"
//             className={styles["search-input"]}
//           />
//         </form>
//       )}
//       {content}
//     </section>
//   );
// };

const Feed = ( { type, user_ID, searchBar = false, data = [] } ) => {
  const [ loading, setLoading ] = useState( false );
  const [ posts, setPosts ] = useState( [] );
  const [ error, setError ] = useState( null );
  const [ ref, inView ] = useInView( {
    triggerOnce: false, // Trigger animation only once
    threshold: 0.2, // When 20% of the element is in view
  } );

  const fadeInAnimation = {
    hidden: { opacity: 0, transform: "translateY(50px)" },
    visible: { opacity: 1, transform: "translateY(0)" },
  };


  const fetchPosts = async () => {
    setLoading( true );
    setError( null );

    try {
      let url = user_ID ? `/api/users/${ user_ID }/posts` : `/api/posts`;
      const response = await fetch( url );

      if ( !response.ok ) {
        throw new Error( `HTTP error! Status: ${ response.status }` );
      }

      const Data = await response.json();
      setPosts( Data );
    } catch ( error ) {
      console.error( "Error fetching posts:", error );
      setError( "An error occurred while fetching posts." );
    } finally {
      setLoading( false );
    }
  };

  useEffect( () => {
    if ( !data.length ) {
      fetchPosts();
    } else {
      setPosts( data );
    }
  }, [ user_ID, searchBar ] );

  const content = useMemo( () => {
    if ( loading ) {
      return <p>Loading...</p>;
    } else if ( error ) {
      return <p>{ error }</p>;
    } else if ( posts.length === 0 ) {
      if ( !user_ID ) {
        return <p>Please try again later.</p>;
      } else {
        return <p>User has no posts.</p>;
      }
    } else {
      return (
        <PostCardList
          setPosts={ setPosts }
          data={ posts }
          handleTagClick={ () => { } }
        />
      );
    }
  }, [ loading, error, user_ID, posts ] );

  return (
    <motion.div
      ref={ ref }
      initial="hidden"
      animate={ inView ? "visible" : "hidden" }
      variants={ fadeInAnimation }
      style={ {
        position: "relative"
      } }
    >
      <section id={ styles.feed }>
        { searchBar && (
          <form className={ styles[ "form" ] }>
            <input
              type="text"
              placeholder="Search Post"
              className={ styles[ "search-input" ] }
            />
          </form>
        ) }
        { content }
      </section>
    </motion.div>
  );
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

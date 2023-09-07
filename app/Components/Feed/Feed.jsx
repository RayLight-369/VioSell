"use client";

import React, { useEffect, useState } from 'react';
import PostCard from '../PostCard/PostCard';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import styles from "./Feed.module.css";

const PostCardList = ({ data, handleTagClick }) => {

  const { data: session } = useSession();
  const router = useRouter();

  const handleEdit = (post) => {
    if (session?.user.id === post.userID) {
      router.push(`/edit-post/${post.id}`);
    }
  }

  const handleDelete = (post) => { 

    const hasConfirmed = confirm("Are you sure you want to delete this Post?");
    
    if (hasConfirmed) {

      console.log(hasConfirmed, post.id);

      fetch(`/api/posts/${post.id}`, {

        method: "DELETE"

      }).then(() => {

        router.refresh();

      })

    }
  }

  return (
    <div id={styles["posts-list"]}>
      { data.map(post => (
        <PostCard
          key={ post.id }
          handleTagClick={ handleTagClick }
          post={ post }
          handleDelete={ handleDelete }
          handleEdit={ handleEdit }
        />
      )) }
    </div>
  )
}

const Feed = ({ type, user_ID }) => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    
    const fetchPosts = async () => {

      try {
        
        let url = user_ID ? `/api/users/${user_ID}/posts` : `/api/posts`;

        const response = await fetch(url)

        const data = await response.json();

        setPosts(data);

        console.log(data); // console.log

      } catch (e) {

        console.log(e);

      }

    };

    fetchPosts();

  }, []);

  return (
    <section id={styles.feed}>
      { posts?.length ? (
        <PostCardList
        data={ posts }
        handleTagClick={ () => { } }
      />
      ) : (
          <p>Check Your Internet Connection</p>
      ) }
    </section>
  )
}

export default Feed;
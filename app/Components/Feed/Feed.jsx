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

  const handleDelete = async (post) => { 
    const hasConfirmed = confirm("Are you sure you want to delete this Post?");
    
    if (hasConfirmed) {
      console.log(hasConfirmed, post.id)
      const req = await fetch(`/api/posts/${post.id}`, {
        method: "DELETE"
      })

      if (req.ok) {
        router.refresh();
      }
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

  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSearchChange = e => {
    setSearchText(e.target.value);
  }

  useEffect(() => {
    const fetchPosts = async () => {

      const response = await fetch(`api/posts`, {
        method: "POST",
        body: JSON.stringify({
          type,
          user_ID: !isNaN(user_ID) ? parseInt(user_ID) : undefined
        })
      });
      const data = await response.json();
      setPosts(data);

    };

    fetchPosts();

  }, []);

  return (
    <section id={styles.feed}>
      <PostCardList
        data={ posts }
        handleTagClick={ () => { } }
      />
    </section>
  )
}

export default Feed;
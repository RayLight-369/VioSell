"use client";

import React, { useEffect, useState } from 'react';
import PostCard from '../PostCard/PostCard';

import styles from "./Feed.module.css";

const PostCardList = ({ data, handleTagClick }) => {
  return (
    <div id={styles["posts-list"]}>
      { data.map(post => (
        <PostCard
          key={ post.id }
          handleTagClick={ handleTagClick }
          post={ post }
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
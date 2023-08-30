"use client";

import React, { useEffect, useState } from 'react';
import PostCard from './PostCard';

import "../styles/Feed.css";

const PostCardList = ({ data, handleTagClick }) => {
  return (
    <div id="posts-list">
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

const Feed = () => {

  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSearchChange = e => {
    setSearchText(e.target.value);
  }

  useEffect(() => {
    const fetchPosts = async () => {

      const response = await fetch("api/posts");
      const data = await response.json();
      setPosts(data);
      console.log(data)

    };

    fetchPosts();

  }, []);

  return (
    <section id="feed">
      <form>
        <input type="text"
          value={ searchText }
          onChange={ handleSearchChange }
          placeholder='Search for a tag or post...'
          className='search-input'
        />
      </form>

      <PostCardList
        data={ posts }
        handleTagClick={ () => { } }
      />
    </section>
  )
}

export default Feed
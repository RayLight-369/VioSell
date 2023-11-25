"use client";

import React, { useEffect, useState, useMemo } from "react";
import PostCard from "../PostCard/PostCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteAllFiles, deleteFile } from "@/app/Supabase/Supabase";

import styles from "./Feed.module.css";

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

const Feed = ( { className, range, type, user_ID, searchBar = false, data, query, setQuery, handleSearch } ) => {
  const [ loading, setLoading ] = useState( false );
  const [ posts, setPosts ] = useState( [] );
  const [ error, setError ] = useState( null );
  const [ filterOpen, setFilterOpen ] = useState( false );


  const fetchPosts = async () => {
    setLoading( true );
    setError( null );

    try {
      let url = user_ID ? `/api/users/${ user_ID }/posts` : `/api/posts`;
      const response = await fetch( `${ url }${ range?.length > 0 ? "?range=" + range[ 0 ] + "_to_" + range[ 1 ] : "" }` );



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
    if ( !data ) {
      fetchPosts();
    } else {
      setPosts( data );
    }
  }, [ user_ID, searchBar, data ] );

  const handleFilterToggle = () => {
    setFilterOpen( prev => !prev );
  };


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
  }, [ loading, error, user_ID, posts, data ] );

  return (
    // <MotionController className={ styles[ "motion" ] }>
    <section id={ styles.feed } className={ className }>
      { searchBar && (
        <form className={ !filterOpen ? `${ styles[ "form" ] }` : `${ styles[ "form" ] } ${ styles[ "active" ] }` } onSubmit={ e => e.preventDefault() }>
          <div className={ styles[ "search-section" ] }>
            <input
              type="text"
              placeholder="Search Post"
              className={ styles[ "search-input" ] }
              value={ query }
              onChange={ e => setQuery( e.target.value ) }
              onKeyDown={ e => {
                handleSearch( e );
              } }
            />
            <button onClick={ handleFilterToggle } className={ !filterOpen ? `${ styles[ "filter" ] }` : `${ styles[ "filter" ] } ${ styles[ "active" ] }` } type="button"><FontAwesomeIcon icon={ faBars } /></button>

          </div>
          <div className={ filterOpen ? `${ styles[ "filter-section" ] }` : `${ styles[ "filter-section" ] } ${ styles[ "active" ] }` }>
            <p>FILTER SECTION GOES HERE!</p>
          </div>
        </form>

      ) }
      { content }
    </section>
    // </MotionController >
  );
};

export default Feed;

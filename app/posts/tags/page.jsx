"use client";

import Feed from "@/app/Components/Feed/Feed";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import styles from "./page.module.css";
import useSWR from "swr";

const relatedFetcher = ( [ url, options ] ) => fetch( url, options ).then( res => res.json() );

const page = ( { searchParams } ) => {
  const { tag } = searchParams;
  // const tags = tag.split("-");
  const tags = tag;
  const [ loading, setLoading ] = useState( true );
  // const [ post, setPost ] = useState( [] );
  const { data: post, isLoading, isValidating } = useSWR( tags ? [ `/api/posts/tags`, {
    method: 'POST',
    body: JSON.stringify( {
      tags
    } )
  } ] : null, relatedFetcher );


  // useEffect( () => {
  //   const fetchPosts = async () => {
  //     const response = await fetch( `/api/posts/tags`, {
  //       method: "POST",
  //       body: JSON.stringify( {
  //         tags,
  //       } ),
  //     } );

  //     const data = await response.json();
  //     console.log( data );
  //     setPost( data );
  //   };
  //   fetchPosts();
  // }, [ tag ] );

  let content;

  if ( isLoading ) {
    content = <p>Loading...</p>;
  } else if ( !isLoading && post ) {
    content = <Feed data={ post } />;
  }

  return (
    <section className={ styles[ "tags-feed" ] }>
      { content }
    </section>
  );
};

export default page;

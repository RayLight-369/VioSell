"use client";

import Feed from "@/app/Components/Feed/Feed";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import styles from "./page.module.css";

const page = ( { searchParams } ) => {
  const { tag } = searchParams;
  // const tags = tag.split("-");
  const tags = tag;
  const [ loading, setLoading ] = useState( true );
  const [ post, setPost ] = useState( [] );

  useEffect( () => {
    const fetchPosts = async () => {
      const response = await fetch( `/api/posts/tags`, {
        method: "POST",
        body: JSON.stringify( {
          tags,
        } ),
      } );

      const data = await response.json();
      console.log( data );
      setPost( data );
    };
    fetchPosts();
  }, [ tag ] );

  return (
    <section className={ styles[ "tags-feed" ] }>
      <Feed data={ post } />
    </section>
  );
};

export default page;

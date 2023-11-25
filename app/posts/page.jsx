"use client";

import { useEffect, useState } from "react";
import Feed from "../Components/Feed/Feed";
import { useRouter } from "next/navigation";
import styles from "./posts.module.css";

const page = () => {

  const [ query, setQuery ] = useState( "" );
  const [ data, setData ] = useState( [] );
  const router = useRouter();

  const handleSearch = async e => {
    if ( e.key == "Enter" && query.trim().length ) {

      router.push( `/posts/search/${ query }` );

    }
  };

  useEffect( () => {
    if ( !query.length ) {
      setData( [] );
    }
  }, [ query ] );

  return (
    <section id={ styles[ "feed" ] }>
      <Feed type={ "all" } searchBar query={ query } setQuery={ setQuery } handleSearch={ handleSearch } />
    </section>
  );
};

export default page;

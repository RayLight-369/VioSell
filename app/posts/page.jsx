"use client";

import { useState } from "react";
import Feed from "../Components/Feed/Feed";

import styles from "./posts.module.css";

const page = () => {

  const [ query, setQuery ] = useState( "" );
  const [ data, setData ] = useState( [] );

  const handleSearch = async e => {
    if ( e.key == "Enter" && query.trim().length ) {

      const request = await fetch( "/api/posts/search", {
        method: "POST",
        body: JSON.stringify( {
          query
        } ),
      } );

      if ( request.ok ) {
        let body = await request.json();
        console.log( body );
        setData( prev => body.data );
      }

    }
  };

  return (
    <section id={ styles[ "feed" ] }>
      <Feed type={ "all" } data={ data } searchBar query={ query } setQuery={ setQuery } handleSearch={ handleSearch } />
    </section>
  );
};

export default page;

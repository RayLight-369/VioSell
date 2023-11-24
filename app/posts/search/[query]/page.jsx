"use client";

import { useEffect, useState } from "react";
import Feed from "../../../Components/Feed/Feed";

import styles from "../../posts.module.css";

const page = ( { params } ) => {


  const [ query, setQuery ] = useState( params.query );
  const [ data, setData ] = useState( [] );

  const handleSearch = async ( e, first ) => {
    if ( first || ( e.key == "Enter" && query.trim().length ) ) {

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

  useEffect( () => {
    handleSearch( null, true );
  }, [] );

  useEffect( () => {
    if ( !query.length ) {
      setData( [] );
    }
  }, [ query ] );

  return (
    <section id={ styles[ "feed" ] }>
      <Feed type={ "all" } data={ data.length ? data : null } searchBar query={ query } setQuery={ setQuery } handleSearch={ handleSearch } />
    </section>
  );
};

export default page;

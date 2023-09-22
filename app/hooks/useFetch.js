import { useState } from "react";
import useSWR from "swr";

const useFetch = ( {
  url,
  method,
  body
} ) => {

  const fetcher = ( url, method, body ) => {
    const requestOptions = {
      method: method || 'GET', // Use the specified method or default to 'GET'
      body: body ? JSON.stringify( body ) : undefined, // Convert body to JSON if it exists
    };
    console.log( url );

    return fetch( url, requestOptions ).then( ( res ) => res.json() );
  };


  // const [ data, setData ] = useState( null );
  const { data, error, isLoading, isValidating } = useSWR( [
    url,
    method,
    body
  ], fetcher );

  return {
    data,
    error,
    isLoading,
    isValidating,
  };

};

export default useFetch;
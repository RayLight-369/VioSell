"use client";

import ImageComponent from "@/app/Components/ImageComponent/ImageComponent";
import { memo, useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard, faLocationDot, faPhone, faRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { v4 as uid } from "uuid";
import useSWR from "swr";

import styles from "./page.module.css";
import Image from "next/image";



const ContactSection = memo( ( { post } ) => {

  const [ contactAppear, setContactAppear ] = useState( false );
  const [ copied, setCopied ] = useState( false );

  const handleClick = () => setContactAppear( true );

  return (
    <>
      {
        contactAppear ? (
          <p
            className={ styles[ "contact" ] }
            onClick={ ( e ) => {

              navigator.clipboard.writeText( post.contact ).then( () => {
                setCopied( true );
                let timeOut = setTimeout( () => {
                  setCopied( false );
                  clearTimeout( timeOut );
                }, 2000 );
              } ).catch( console.log );

            } }>
            <FontAwesomeIcon className={ styles[ "phone-icon" ] } icon={ faPhone } />
            { copied ? "Copied!!" : post.contact }
          </p>
        ) : (
          <button type="button" className={ styles[ "contact-display-btn" ] } onClick={ () => handleClick() }>
            <FontAwesomeIcon className={ styles[ "phone-icon" ] } icon={ faPhone } />
            Show Contact Number
          </button>
        )
      }
    </>
  );

} );

const Post = ( { params } ) => {
  const { postID } = params;
  // const [ post, setPost ] = useState( {} );
  // const [ user, setUser ] = useState( {} );
  const [ pfp, setPfp ] = useState( "/Images/favicon.svg" );
  // const [ contactAppear, setContactAppear ] = useState( false );
  const [ loading, setLoading ] = useState( true );
  const [ ImageComponentWidth, setImageComponentWidth ] = useState( 0 );
  const [ ImageComponentHeight, setImageComponentHeight ] = useState( 0 );

  const fetcher = url => fetch( url ).then( res => res.json() );

  const { data: post, error: postError, isLoading: postLoading } = useSWR( `/api/posts/${ postID }`, fetcher );
  // Only fetch user data if post data is available
  const { data: user, error: userError, isLoading: userLoading } = useSWR(
    post ? `/api/users/${ post.userID }` : null, // Pass null if post data is not available
    fetcher
  );

  useEffect( () => {
    setImageComponentWidth( 550 );
    setImageComponentHeight( 480 );
    setLoading( postLoading );
    if ( user?.image ) {
      setPfp( user.image );
    }
  }, [ user ] );

  // useEffect( () => {
  //   const fetchPost = async () => {
  //     try {
  //       const postData = await ( await fetch( `/api/posts/${ postID }` ) ).json();
  //       console.log( postData );

  //       setImageComponentWidth( 550 );
  //       setImageComponentHeight( 480 );

  //       setPost( ( prev ) => ( { ...prev, ...postData } ) );

  //       const userData = await (
  //         await fetch( `/api/users/${ postData.userID }` )
  //       ).json();

  //       console.log( userData );
  //       setPfp( userData.image );
  //       setUser( ( prev ) => ( { ...prev, ...userData } ) );
  //     } catch ( e ) {
  //       console.log( e );
  //     } finally {
  //       setLoading( false );
  //     }
  //   };

  //   fetchPost();
  //   console.log( "post: ", post );
  // }, [ postID ] );

  let content;
  let contactContent;

  // const contactDisplay = useMemo( () => {
  //   if ( contactAppear ) {
  //     return <p className={ styles[ "contact" ] }>{ post.contact }</p>;
  //   } else {
  //     return (
  //       <button
  //         type="button"
  //         className={ styles[ "contact-display-btn" ] }
  //         onClick={ () => setContactAppear( true ) }
  //       >
  //         Show Contact Number
  //       </button>
  //     );
  //   }
  // }, [ contactAppear ] );

  if ( postLoading || userLoading ) {
    content = <p>Loading...</p>;
  } else {
    content = post.title ? (
      <>
        <p className={ styles[ "title" ] }>
          { post.title.length > 50
            ? post.title.substring( 0, 50 ) + "..."
            : post.title }
        </p>
        <section className={ styles[ "images-info" ] }>
          <ImageComponent
            images={ post.images }
            width={ ImageComponentWidth }
            height={ ImageComponentHeight }
            className={ styles[ "image-component" ] }
            key={ uid() }
          />

          <div className={ styles[ "info" ] }>
            <div className={ styles[ "profile" ] }>
              <div className={ styles[ "image-info" ] }>
                <div className={ styles[ "pfp" ] }>
                  <Image width={ 20 } height={ 20 } alt="user image" src={ pfp } />
                </div>
                <div className={ styles[ "user-info" ] }>
                  <p className={ styles[ "username" ] }>{ user?.name || "User" }</p>
                  <p className={ styles[ "date" ] }>
                    Member since { user?.created_at || "9-Sep 2023" }
                  </p>
                  <ContactSection post={ post } />
                </div>
              </div>
              <div className={ styles[ "location" ] }>
                <p className={ styles[ "location" ] }>
                  <FontAwesomeIcon icon={ faLocationDot } className={ styles[ "location-icon" ] } />
                  <span>{ post.location }</span>
                </p>
              </div>
              <div className={ styles[ "price" ] }>
                <p className={ styles[ "price" ] }>
                  <FontAwesomeIcon icon={ faRupeeSign } className={ styles[ "price-icon" ] } />
                  <span>{ post.price }</span>
                </p>
              </div>
              <div className={ styles[ "ad-id" ] }>
                <p className={ styles[ "ad-id" ] }>
                  <FontAwesomeIcon icon={ faIdCard } className={ styles[ "ad-id-icon" ] } />
                  <span>AD-ID: { post.id }</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </>
    ) : (
      <p>No Post with this ID.</p>
    );
  }

  return <section className={ styles[ "post-page" ] }>{ content }</section>;
};

export default Post;
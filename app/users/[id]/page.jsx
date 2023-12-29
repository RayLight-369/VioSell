"use client";

import Feed from '@/app/Components/Feed/Feed';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import styles from "./page.module.css";
import Image from 'next/image';

const Profile = ( { params } ) => {

  const { data: session } = useSession();
  const [ isMobile, setIsMobile ] = useState( true );
  const [ user, setUser ] = useState( { name: "", email: "", image: "", id: 0, created_at: "" } );

  useEffect( () => {
    // if ( session?.user.id != params.id ) {
    const abort = new AbortController();
    let footer = document.querySelector( "footer" );
    footer.style.top = "100%";

    const getUser = async () => {
      const body = await ( await fetch( `/api/users/${ params.id }`, { signal: abort.signal } ) ).json();
      // {cache: "no-store"}

      setUser( {
        name: body.name,
        email: body.email,
        image: body.image,
        id: parseInt( body.id ),
        created_at: body.created_at
      } );
    };

    getUser();

    const handleResize = () => setIsMobile( window.innerWidth <= 767 );

    window.addEventListener( 'resize', handleResize );

    return () => {
      abort.abort();
      footer.style.top = "200px";
      window.removeEventListener( 'resize', handleResize );
    };
    // }
  }, [] );


  return (
    <>
      { !isMobile && (
        <section id={ styles[ "intro" ] }>
          <p className={ styles[ "intro-name" ] }>{ user.name }</p>
          <Image
            src={ "/Images/bubbles.svg" }
            width={ 300 }
            height={ 150 }
            alt='bubbles'
            className={ styles[ 'bubbles' ] }
          />
        </section>
      ) }

      <section id={ styles[ "profile" ] }>
        <div className={ styles[ "user-info" ] }>
          <div className={ styles[ "img-name" ] }>
            <Image
              alt='pfp'
              src={ params.id == session?.user.id ? session?.user.image : user.image }
              width={ 60 }
              height={ 60 }
            />
            <p className={ styles[ "name" ] }>{ params.id == session?.user.id ? session?.user.name : user.name }</p>
          </div>
          <hr className={ styles[ 'hr' ] } />
          <div className={ styles[ "stats" ] }>
          </div>
          <div className={ styles[ "account-date" ] }>
            <p>Account made on:</p>
            <span>{ user.created_at }</span>
          </div>
          <hr className={ styles[ 'hr' ] } />
          { session?.user.id == user.id && (
            <button className={ styles[ 'delete-btn' ] }>Delete my account</button>
          ) }
        </div>
        <div className={ styles[ "posts" ] }>
          <h1 className={ styles[ "title" ] }>
            { params.id == session?.user.id ? "My Posts" : <>{ user.name + "'s Posts" }</> }
          </h1>
          <Feed user_ID={ params.id } className={ styles[ "feed" ] } />
        </div>
      </section>
    </>
  );
};

export default Profile;
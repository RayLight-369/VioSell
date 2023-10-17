"use client";

import Feed from '@/app/Components/Feed/Feed';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import styles from "./page.module.css";
import Image from 'next/image';

const Profile = ( { params } ) => {

  const { data: session } = useSession();
  const [ user, setUser ] = useState( { name: "", email: "", image: "", id: 0 } );

  useEffect( () => {
    if ( session?.user.id != params.id ) {
      const getUser = async () => {
        const body = await ( await fetch( `/api/users/${ params.id }` ) ).json();
        // {cache: "no-store"}

        setUser( {
          name: body.name,
          email: body.email,
          image: body.image,
          id: parseInt( body.id ),
        } );
      };

      getUser();
    }
  }, [] );


  return (
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
      </div>
      <div className={ styles[ "posts" ] }>
        <h1 className={ styles[ "title" ] }>
          { params.id == session?.user.id ? "My Posts" : <>{ user.name + "'s Posts" }</> }
        </h1>
        <Feed user_ID={ params.id } className={ styles[ "feed" ] } />
      </div>
    </section>
  );
};

export default Profile;
"use client";

import Feed from '../../../Components/Feed/Feed';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import styles from "./my-posts.module.css"

const page = ({ params }) => {

  const { data: session } = useSession();
  const [user, setUser] = useState({ name: "" , email: "", image: "", id: 0 });
  
  useEffect(() => {

    const getUser = async () => {

      const body = await (await fetch(`/api/users/${params.id}`)).json();

      setUser({
        name: body.name,
        email: body.email,
        image: body.image,
        id: parseInt(body.id)
      });
      
    };

    getUser();

  }, [])
  

  return (
    <section id={ styles['my-posts'] }>
      
      { params.id == session?.user.id ? (
        <h1 className={ styles['title'] }>My Posts</h1>
      ) : (
        <>
          { session?.user && <h1 className={ styles['title'] }>{ `${user.name}'s` } Posts</h1> }
        </>
      )}
      
      <Feed
        user_ID={params.id}
      />

    </section>
  )
}

export default page
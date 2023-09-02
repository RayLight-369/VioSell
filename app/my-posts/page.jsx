"use client";

import Feed from '../Components/Feed/Feed';
import { useSession } from 'next-auth/react';

import "../PageCss/my-posts.css"

const page = () => {

  const { data: session } = useSession();

  return (
    <section id='my-posts'>
      <h1>My Posts</h1>
      { session ? (
        <Feed
          user_ID={session?.user.id}
        />
      ) : (
        <p>sign in first , from top-right.</p>
      )}
    </section>
  )
}

export default page
"use client";

import { SessionProvider } from "next-auth/react";

export async function getUser () {
  try {
    let body = await fetch( "/api/auth/session" );
    let user = await body.json();
    if ( Object.keys( user ).length && Object.keys( user.user ).length ) {
      return { session: user, signedIn: true };
    }
    return { session: null, signedIn: false };
  } catch ( e ) {
    console.log( e );
  }
}

const Provider = ( { children, session } ) => {
  return (
    <SessionProvider session={ session }>
      { children }
    </SessionProvider>
  );
};

export default Provider;
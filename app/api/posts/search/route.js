import { getData, search } from "@/app/Supabase/Supabase";

export const POST = async ( req ) => {
  const { query } = await req.json();

  try {

    const posts = await search( {
      table: "posts",
      colums: [ "title", "description", "tags" ],
      query
    } );

    if ( posts.length ) return new Response( JSON.stringify( { data: posts } ), { status: 200 } );

    return new Response( JSON.stringify( { error: "no posts found" } ), { status: 404 } );

  } catch ( e ) {
    return new Response( JSON.stringify( { error: e } ), { status: 505 } );
  }

};
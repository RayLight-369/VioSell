import { getData } from "@/app/Supabase/Supabase";

export const POST = async ( req, res ) => {

  try {

    const body = await req.json();
    const tagString = body.tags;
    const tags = tagString.split( "-" );

    const object = {
      table: "posts",
      contains: {
        tags
      }
    };

    if ( body.range?.length ) object[ "range" ] = body.range;

    console.log( object );

    const Data = await getData( object ).then( ( data ) => data?.data );

    if ( !Data ) return new Response( "No Post Found", { status: 404 } );

    return new Response( JSON.stringify( Data ), { status: 200 } );

  } catch ( e ) {
    console.log( e );
    return new Response( "Failed to fetch Posts", { status: 500 } );
  }

};
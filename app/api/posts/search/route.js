import { getData, search } from "@/app/Supabase/Supabase";

export const POST = async ( req ) => {
  const { query, range, filter } = await req.json();

  let object = {
    table: "posts",
    colums: [ "title", "description", "tags" ],
    query,
    orderBy: {
      property: "id",
      ascending: false
    }
  };

  if ( range?.length ) object.range = range;

  if ( filter ) {
    switch ( filter.toLowerCase() ) {
      case "oldest": {
        object.orderBy.ascending = true;
        object.filter = "oldest";
        break;
      }
      case "newest": {
        object.orderBy.ascending = false;
        object.filter = "newest";
        break;
      }
      default: {
        object.filter = "relevance";
        object.orderBy = {
          property: "id",
          ascending: false
        };
      }
    }
  }

  try {

    const posts = await search( object );

    if ( posts.length ) return new Response( JSON.stringify( { data: posts } ), { status: 200 } );

    return new Response( JSON.stringify( { error: "no posts found" } ), { status: 404 } );

  } catch ( e ) {
    return new Response( JSON.stringify( { error: e } ), { status: 505 } );
  }

};
import { getData, insertData } from "@/app/Supabase/Supabase";

export const POST = async ( req, res ) => {
  // const query = new URL( await req.url ).searchParams;
  // const limit = query.has( "range" ) ? ( query.get( "range" ) ).split( "_to_" ).map( item => parseInt( item ) ) : null;

  const { range, filter } = await req.json();
  const object = {
    table: "posts",
    orderBy: {
      property: "id",
      ascending: false
    }
  };

  if ( range?.length ) object[ "range" ] = range;
  if ( filter ) {
    switch ( filter.toLowerCase() ) {
      case "oldest": {
        object.orderBy.ascending = true;
        break;
      }
      case "newest": {
        object.orderBy.ascending = false;
        break;
      }
      default: {
        break;
      }
    }
  }

  console.log( object );

  try {

    const { data, remaining } = await getData( object );
    // const posts = data.data;
    console.log( remaining );

    return new Response( JSON.stringify( { data, remaining } ), { status: 200 } );

  } catch ( e ) {

    return new Response( JSON.stringify( { error: "Failed" } ), { status: 500 } );

  }

};

// export const POST = async ( req, res ) => {
//   const body = await req.json();
//   const limit = body?.range;

//   const object = {
//     table: "posts",
//     orderBy: {
//       property: "id",
//       ascending: false
//     }
//   };

//   if ( limit?.length ) object[ "range" ] = limit;

//   try {

//     const data = await getData( object );

//     const date = new Date();

//     const posts = data.data;

//     return new Response( JSON.stringify( posts ), { status: 200 } );

//   } catch ( e ) {

//     return new Response( JSON.stringify( { error: "Failed" } ), { status: 500 } );

//   }

// };
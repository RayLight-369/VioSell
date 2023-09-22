import { getData } from "@/app/Supabase/Supabase";

export const GET = async ( req, res ) => {
  const query = new URL( await req.url ).searchParams;
  const limit = query.has( "range" ) ? ( query.get( "range" ) ).split( "_to_" ).map( item => parseInt( item ) ) : null;

  const object = {
    table: "posts",
    orderBy: {
      property: "id",
      ascending: false
    }
  };

  console.log( object );

  if ( limit?.length ) object[ "range" ] = limit;

  try {

    const data = await getData( object );

    const date = new Date();

    // const data = {
    //   data: [{
    //     title: "Title of the Post",
    //     description: "Description of the Post Description of the Post Description of the Post Description of the PostDescription of the Post Description of the Post Description of the Post Description of the PostDescription of the PostDescription of the Post" ,
    //     tags: "#tag1 #tag2",
    //     userID: 2,
    //     id: 5,
    //     created_at: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    //   },{
    //     title: "Title of the Post",
    //     description: "Description of the Post Description of the Post Description of the Post Description of the PostDescription of the Post Description of the Post Description of the Post Description of the PostDescription of the PostDescription of the Post",
    //     tags: "#tag1 #tag2",
    //     userID: 2,
    //     id: 1,
    //     created_at: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    //   },{
    //     title: "Title of the Post",
    //     description: "Description of the Post Description of the Post Description of the Post Description of the PostDescription of the Post Description of the Post Description of the Post Description of the PostDescription of the PostDescription of the Post",
    //     tags: "#tag1 #tag2",
    //     userID: 5,
    //     id: 1,
    //     created_at: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    //   },{
    //     title: "Title of the Post",
    //     description: "Description of the Post Description of the Post Description of the Post Description of the PostDescription of the Post Description of the Post Description of the Post Description of the PostDescription of the PostDescription of the Post",
    //     tags: "#tag1 #tag2",
    //     userID: 2,
    //     id: 1,
    //     created_at: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    //   }]
    // }

    const posts = data.data;

    return new Response( JSON.stringify( posts ), { status: 200 } );

  } catch ( e ) {

    return new Response( JSON.stringify( { error: "Failed" } ), { status: 500 } );

  }

};
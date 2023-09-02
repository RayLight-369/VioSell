import { getData } from "@/app/Supabase/Supabase";

export const POST = async (req, res) => { 
  
  // let { searchParams } = new URL(req.url);
  // let type = searchParams.get("type");

  let { type, user_ID } = await req.json();

  let object = {
    table: "posts"
  };

  if (type || user_ID) {
    object.where = {};
  }

  if (type && type != "all") { 
    object.where.type = type;
  }

  if (user_ID) {
    object.where.userID = user_ID;
  }

  try {

    const data = await getData(object);

    // const date = new Date();

    // const data = {
    //   data: [{
    //     title: "Title of the Post",
    //     description: "Description of the Post Description of the Post Description of the Post Description of the PostDescription of the Post Description of the Post Description of the Post Description of the PostDescription of the PostDescription of the Post" ,
    //     tags: "#tag1 #tag2",
    //     userID: 2,
    //     id: 1,
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
    //     userID: 2,
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

    return new Response(JSON.stringify(posts), { status: 200 });

  } catch (e) {

    return new Response("Failed", { status: 500 });

  }

};


// export const POST = async (req, res) => { 
//   let { ID } = req.json();
//   console.log(ID)
// };
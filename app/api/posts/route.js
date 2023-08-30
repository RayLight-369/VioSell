import { getData } from "@/app/Supabase/Supabase";

export const GET = async (req, res) => { 
  
  try {

    const data = await getData({
      table: "posts"
    });

    // const data = {
    //   data: [{
    //     title: "Title of the Post",
    //     description: "Description of the Post",
    //     tags: "#tag1 #tag2",
    //     userID: 2,
    //     id: 1
    //   },{
    //     title: "Title of the Post",
    //     description: "Description of the Post",
    //     tags: "#tag1 #tag2",
    //     userID: 2,
    //     id: 1
    //   },{
    //     title: "Title of the Post",
    //     description: "Description of the Post",
    //     tags: "#tag1 #tag2",
    //     userID: 2,
    //     id: 1
    //   },{
    //     title: "Title of the Post",
    //     description: "Description of the Post",
    //     tags: "#tag1 #tag2",
    //     userID: 2,
    //     id: 1
    //   }]
    // }
  
    const posts = data.data;

    return new Response(JSON.stringify(posts), { status: 200 });

  } catch (e) {

    return new Response("Failed", { status: 500 });
    // return new Response(JSON.stringify({
    //   title: "Title blahblah",
    //   description: "desc desc of esc mobile desc",
    //   tags: "#web #mobile #app",
    //   userID: 3,
    //   id: 1
    // }), { status: 200 });

  }

};
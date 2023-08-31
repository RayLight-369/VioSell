import { getData } from "@/app/Supabase/Supabase";
// import { usePathname, useSearchParams } from "next/navigation";

export const GET = async (req, res) => { 
  
  let { searchParams } = new URL(req.url);
  let type = searchParams.get("type");

  try {

    const data = await getData({
      table: "posts"
    });

    // const date = new Date();

    // const data = {
    //   data: [{
    //     title: "Title of the Post",
    //     description: "Description of the Post Description of the Post Description of the Post Description of the PostDescription of the Post Description of the Post Description of the Post Description of the PostDescription of the PostDescription of the Post" ,
    //     tags: "#tag1 #tag2",
    //     userID: 2,
    //     id: 1,
    //     created_at: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
    //   },{
    //     title: "Title of the Post",
    //     description: "Description of the Post Description of the Post Description of the Post Description of the PostDescription of the Post Description of the Post Description of the Post Description of the PostDescription of the PostDescription of the Post",
    //     tags: "#tag1 #tag2",
    //     userID: 2,
    //     id: 1,
    //     created_at: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
    //   },{
    //     title: "Title of the Post",
    //     description: "Description of the Post Description of the Post Description of the Post Description of the PostDescription of the Post Description of the Post Description of the Post Description of the PostDescription of the PostDescription of the Post",
    //     tags: "#tag1 #tag2",
    //     userID: 2,
    //     id: 1,
    //     created_at: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
    //   },{
    //     title: "Title of the Post",
    //     description: "Description of the Post Description of the Post Description of the Post Description of the PostDescription of the Post Description of the Post Description of the Post Description of the PostDescription of the PostDescription of the Post",
    //     tags: "#tag1 #tag2",
    //     userID: 2,
    //     id: 1,
    //     created_at: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
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
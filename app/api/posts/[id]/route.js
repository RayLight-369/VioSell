import { getData, deleteData, updateData } from "@/app/Supabase/Supabase";

// GET

export const GET = async (req, {params}) => {

  try {
    
    const body = await getData({
      table: "posts",
      where: {
        id: params.id
      }
    }).then(res => res.data[0]);

    if (!body) return new Response("Post Not Found", { status: 404 });

    return new Response(JSON.stringify(body), { status: 200 });

  } catch (err) {

    return new Response("Failed to Fetch", { status: 500 });

  }

}


// PATCH

export const PUT = async (req, { params }) => { 

  try {

    const response = await req.json();
    const existingPost = await getData({
      table: "posts",
      where: {
        id: params.id
      }
    });

    if (!(existingPost?.data?.length)) return new Response("Post Not Found", { status: 404 });
    
    const updatedPost = await updateData({
      table: "posts",
      where: {
        id: params.id
      },
      object: {
        ...response
      }
    }).then(console.log);

    return new Response(JSON.stringify(updatedPost), { status: 200 });

  } catch (err) {

    console.log(err);
    return new Response(JSON.stringify({ error: "Failed to Update Post." }), { status: 500 });

  }

}


// DELETE
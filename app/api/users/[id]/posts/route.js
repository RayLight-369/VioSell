import { getData } from "@/app/Supabase/Supabase";

export const GET = async (req, { params }) => {
  try {
    
    const body = await getData({
      table: "posts",
      where: {
        userID: params.id
      }
    });

    if (!body?.data?.length) return new Response("Posts Not Found", { status: 404 })
    
    return new Response(JSON.stringify(body.data), { status: 200 });

  } catch (err) {

    console.log(err);
    return new Response("Failed to get Posts", { status: 500 });

  }
}
import { insertData } from "@/app/Supabase/Supabase";

export const POST = async (req) => {

  const body = await req.json();

  await insertData({
    table: "feedbacks",
    object: body
  });

  try {

    return new Response(JSON.stringify(body.data), { status: 200 });

  } catch (err) {

    console.log(err);
    return new Response("Failed to post Feedback", { status: 500 });

  }
};
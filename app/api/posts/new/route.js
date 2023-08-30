import { insertData } from "@/app/Supabase/Supabase";

export const POST = async (req, res) => {
  const DATA = await req.json();
  try {
    
    let data = await insertData({
      table: "posts",
      object: {
        ...DATA
      }
    }).then(Data => Data);

    console.log(data)

    return new Response(JSON.stringify(DATA), {status: 201});

  } catch (e) {
    return new Response("Failed")
  }
};
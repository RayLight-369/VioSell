import { insertData } from "@/app/Supabase/Supabase";

export const POST = async (req, res) => {
  const DATA = await req.json();
  const date = new Date();
  try {
    
    let data = await insertData({
      table: "posts",
      object: {
        ...DATA,
        created_at: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
      }
    }).then(Data => Data);

    console.log(data)

    return new Response(JSON.stringify(DATA), {status: 201});

  } catch (e) {
    return new Response("Failed")
  }
};
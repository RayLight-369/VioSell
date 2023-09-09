import { getData } from "@/app/Supabase/Supabase";

export const POST = async (req, res) => {

  try {
    const { tags: tagString } = await req.json();
    const tags = tagString.split("-");
    const Data = await getData({
      table: "posts",
      contains: {
        tags
      }
    }).then((data) => data?.data);

    if (!Data) return new Response("No Post Found", { status: 404 });

    return new Response(JSON.stringify(Data), { status: 200 });

  } catch (e) {
    console.log(e);
    return new Response("Failed to fetch Posts", { status: 500 });
  }

};
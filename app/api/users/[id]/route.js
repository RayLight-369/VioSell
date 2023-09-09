import { getData } from "@/app/Supabase/Supabase";

export const GET = async (req, { params }) => {
  try {

    const body = await getData({
      table: "users",
      where: {
        id: params.id
      }
    });

    if (!body?.data?.length) return new Response("User Not Found", { status: 404 });

    return new Response(JSON.stringify(body.data[0]), { status: 200 });

  } catch (err) {

    console.log(err);
    return new Response("Failed to get User", { status: 500 });

  }
};
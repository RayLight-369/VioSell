'use client';

import Form from "@/app/Components/Form/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const page = ({ params }) => {

  const { postID } = params;
  const [post, setPost] = useState({ title: "", description: "", tags: "" });
  const [submitting, setSubmitting] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const [error, setError] = useState("");

  useEffect(() => {

    const fetchPost = async () => { 
      try{
        
        const response = await fetch(`/api/posts/${postID}`);
      
        const body = await response.json();

        // console.log(body);

        if (response.ok) {
          if (body.userID == session?.user.id) {
            setPost({ title: body.title, description: body.description, tags: body.tags });
          }
        }
      

      } catch (e) {
        console.log(e)
        if (e.message === "You are not allowed to Edit this Post") {
          setError("You are not allowed to Edit this Post");
        }
      }
    }

    fetchPost();

  }, [session]);

  async function editPost (e) {
    e.preventDefault();
    setSubmitting(true);

    try {
      
      const request = await fetch(`/api/posts/${postID}`, {
        method: "PUT",
        body: JSON.stringify({
          ...post,
        }),
        // headers: { 'Content-Type': 'application/json' }
      })

      if (request.ok) {
        router.push("/");
      }

    } catch (e) {

      console.log(e)

    } finally {

      setSubmitting(false);

    }
  }

  if (error.length > 1) {
    return <h1>{ error }</h1>
  }
  return (
    <>
      { session?.user ? (
        <Form
          type={ "Edit" }
          post={ post }
          setPost={ setPost }
          handleSubmit={ editPost }
          submitting={submitting}
        />
      ) : (
          <p>User not Signed In.</p>
      )}
    </>
  )
}

export default page
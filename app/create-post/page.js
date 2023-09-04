"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
// import { CldUploadButton } from 'next-cloudinary';
import Form from "../Components/Form/Form";
import { uploadFile } from "../Supabase/Supabase";

const CreatePost = () => {

  const [ submitting, setSubmitting ] = useState(false);
  const [post, setPost] = useState({ description: "", tags: "", title: "", location: "" });
  const { data: session } = useSession();
  const router = useRouter();

  const createPost = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // const date = new Date();

    try {
      
      const response = await fetch("/api/posts/new", {
        method: "POST",
        body: JSON.stringify({
          ...post,
          userID: session.user.id
        })
      })

      if (response.ok) {
        router.push("/")
      }
      
    } catch (e) {

      console.log(e);

    } finally {

      setSubmitting(false);

    }

  };

  return (
    <>
      { session?.user ? (
        <>
        <Form
          post={ post }
          type="Create"
          setPost={ setPost }
          submitting={ submitting }
          handleSubmit={ createPost }
          />

          {/* <CldUploadButton
            uploadPreset="rp9nzn6b"       
      /> */}
        </>
      ):(
        <button onClick={ () => signIn('google') }>SignIn With Google</button>
      )}
    
      </>
  )
}

export default CreatePost
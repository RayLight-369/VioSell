"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Form from "../Components/Form";
import { useSession } from "next-auth/react";
import { CldUploadButton } from 'next-cloudinary';

const CreatePost = () => {

  const [ submitting, setSubmitting ] = useState(false);
  const [post, setPost] = useState({ description: "", tags: "", title: "" });
  const { data: session } = useSession();
  const router = useRouter();

  const createPost = async (e) => {
    e.preventDefault();
    setSubmitting(true);

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
  )
}

export default CreatePost
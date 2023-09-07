"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { getFile, supabase, updateData, uploadFile } from "../Supabase/Supabase";
import { v4 as uid } from "uuid";
import Form from "../Components/Form/Form";


const CreatePost = () => {

  const [submitting, setSubmitting] = useState(false);

  const [post, setPost] = useState({
    description: "", tags: "", title: "", location: "", price: 0, images: []
  });

  const { data: session } = useSession();
  const router = useRouter();

  const SetImages = async (images, Post) => {

    let imageArray = [];

    for (let image in images) {

      let fileId = uid();
      let extension = images[image].type.replace("image/", "").toLowerCase();

      imageArray.push(
        `https://lmxqvapkmczkpcfheiun.supabase.co/storage/v1/object/public/images/users/${session?.user.id}/${Post.id}/${fileId}.${extension}`
      );

      await uploadFile(
        session?.user.id,
        Post.id,
        fileId + "." + extension,
        images[image]
      );
    };

    let _post = post;
    _post.images = [...imageArray];

    setPost(prev => ({ ...prev, images: [...prev.images, ...imageArray] }));

    try {

      await updateData({
        table: "posts",
        where: {
          id: Post.id
        },
        object: {
          ...post,
          userID: session.user.id
        }
      }).then(console.log);

    } catch (e) {
      console.log(e);
    }
  };

  const createPost = async (e, images) => {

    e.preventDefault();
    setSubmitting(true);

    try {

      const response = await fetch("/api/posts/new", {
        method: "POST",
        body: JSON.stringify({
          ...post,
          userID: session.user.id
        })
      });

      let data = await response.json();

      await SetImages(images, data);

      if (response.ok) {
        router.push("/");
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
        </>
      ) : (
        <button onClick={ () => signIn('google') }>SignIn With Google</button>
      ) }

    </>
  );
};

export default CreatePost;
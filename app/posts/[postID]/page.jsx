"use client";

import ImageComponent from "@/app/Components/ImageComponent/ImageComponent";
import { useEffect, useState } from "react";


const Post = ({ params }) => {

  let { postID } = params;
  let [post, setPost] = useState({});

  useEffect(() => {

    const fetchPost = async () => {

      const data = await (await fetch(`/api/posts/${postID}`)).json();
      console.log(data);

      setPost(data);

    }

    fetchPost();

  }, [])

  return (
    <section className="post-page">
      <ImageComponent
        style={ {
          top: 90,
          left: 30
        } }
        
        images={post.images}
      />
    </section>
  )
}

export default Post;
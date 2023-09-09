"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { deleteFile, updateData, uploadFile } from "@/app/Supabase/Supabase";
import { v4 as uuidv4 } from "uuid";
import Form from "@/app/Components/Form/Form";

const Page = ({ params }) => {
  const { postID } = params;
  const [post, setPost] = useState({
    title: "",
    description: "",
    tags: "",
    location: "",
    price: 0,
    images: [],
  });
  const [submitting, setSubmitting] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${postID}`);
        const body = await response.json();

        if (response.ok && body.userID == session?.user.id) {
          setPost({
            title: body.title,
            description: body.description,
            tags: body.tags,
            location: body.location,
            price: +body.price,
            images: [...body.images],
          });
        }
      } catch (e) {
        console.error(e);
        if (e.message === "You are not allowed to Edit this Post") {
          setError("You are not allowed to Edit this Post");
        }
      }
    };

    fetchPost();
  }, [postID, session?.user]);

  const getMissingImages = (imagesArray, obj) => {
    const objKeysSet = new Set(Object.keys(obj));
    return imagesArray.filter((image) => !objKeysSet.has(image));
  };

  const setImages = async (images, post) => {
    const imageArray = [];
    const deletedImages = getMissingImages(post.images, images);

    for (let image in images) {
      if (typeof images[image] !== "string") {
        const fileId = uuidv4();
        const extension = images[image].type.replace("image/", "").toLowerCase();

        imageArray.push(
          `https://lmxqvapkmczkpcfheiun.supabase.co/storage/v1/object/public/images/users/${session?.user.id}/${postID}/${fileId}.${extension}`
        );
        await uploadFile(
          session?.user.id,
          postID,
          `${fileId}.${extension}`,
          images[image]
        );
      } else {
        imageArray.push(image);
      }
    }

    if (deletedImages.length) {
      for (const image of deletedImages) {
        const url = image.split("/");
        const fileID = url[url.length - 1];
        await deleteFile(`users/${session?.user.id}/${postID}/${fileID}`);
      }
    }

    setPost((prev) => ({ ...prev, images: [...imageArray] }));
  };

  const editPost = async (e, images, data) => {
    e.preventDefault();
    setSubmitting(true);
    await setImages(images, data);

    try {
      const request = await fetch(`/api/posts/${postID}`, {
        method: "PUT",
        body: JSON.stringify({ ...data }),
      });

      if (request.ok) {
        router.push("/");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  if (error.length > 1) {
    return <h1>{ error }</h1>;
  }

  return (
    <>
      { session?.user ? (
        <Form
          type="Edit"
          post={ post }
          setPost={ setPost }
          handleSubmit={ editPost }
          submitting={ submitting }
        />
      ) : (
        <p>User not Signed In.</p>
      ) }
    </>
  );
};

export default Page;











// "use client";

// import Form from "@/app/Components/Form/Form";
// import { deleteFile, updateData, uploadFile } from "@/app/Supabase/Supabase";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { v4 as uid } from "uuid";

// const page = ({ params }) => {
//   const { postID } = params;
//   const [post, setPost] = useState({
//     title: "",
//     description: "",
//     tags: "",
//     location: "",
//     price: 0,
//     images: [],
//   });
//   const [submitting, setSubmitting] = useState(false);
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchPost = async () => {

//       try {
//         const response = await fetch(`/api/posts/${postID}`);
//         const body = await response.json();

//         if (response.ok) {
//           if (body.userID == session?.user.id) {
//             setPost({
//               title: body.title,
//               description: body.description,
//               tags: body.tags,
//               location: body.location,
//               price: +body.price,
//               images: [...body.images],
//             });
//           }
//         }
//       } catch (e) {
//         console.log(e);
//         if (e.message === "You are not allowed to Edit this Post") {
//           setError("You are not allowed to Edit this Post");
//         }
//       }
//     };

//     fetchPost();
//   }, [status]);

//   function getMissingImages (imagesArray, obj) {
//     const objKeysSet = new Set(Object.keys(obj));
//     const missingImages = imagesArray.filter((image) => !objKeysSet.has(image));
//     return missingImages;
//   }

//   const SetImages = async (images, Post) => {
//     let imageArray = [];

//     let deletedImages = getMissingImages(Post.images, images);

//     for (let image in images) {
//       if (typeof images[image] != "string") {
//         let fileId = uid();
//         let extension = images[image].type.replace("image/", "").toLowerCase();

//         imageArray.push(
//           `https://lmxqvapkmczkpcfheiun.supabase.co/storage/v1/object/public/images/users/${session?.user.id}/${postID}/${fileId}.${extension}`
//         );
//         await uploadFile(
//           session?.user.id,
//           postID,
//           fileId + "." + extension,
//           images[image]
//         );
//       } else {
//         imageArray.push(`${image}`);
//       }

//       if (deletedImages.length) {
//         for (let image of deletedImages) {
//           let url = image.split("/");
//           let fileID = url[url.length - 1];

//           await deleteFile(`users/${session?.user.id}/${postID}/${fileID}`);
//         }
//       }
//     }

//     let _post = post;
//     _post.images = [...imageArray];

//     console.log("another posts: ", _post);

//     setPost((prev) => ({ ...prev, images: [...imageArray] }));

//     console.log("imageArray: ", imageArray);
//     console.log("Post after function: ", Post);
//     console.log("post after function: ", post);
//   };

//   async function editPost (e, images, data) {
//     e.preventDefault();
//     setSubmitting(true);
//     await SetImages(images, data);

//     try {
//       const request = await fetch(`/api/posts/${postID}`, {
//         method: "PUT",
//         body: JSON.stringify({
//           ...data,
//         }),
//         // headers: { 'Content-Type': 'application/json' }
//       });

//       if (request.ok) {
//         router.push("/");
//       }
//     } catch (e) {
//       console.log(e);
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   if (error.length > 1) {
//     return <h1>{ error }</h1>;
//   }
//   return (
//     <>
//       { session?.user ? (
//         <Form
//           type={ "Edit" }
//           post={ post }
//           setPost={ setPost }
//           handleSubmit={ editPost }
//           submitting={ submitting }
//         />
//       ) : (
//         <p>User not Signed In.</p>
//       ) }
//     </>
//   );
// };

// export default page;

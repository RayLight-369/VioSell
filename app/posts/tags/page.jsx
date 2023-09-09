"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const page = ({ searchParams }) => {
  const { tag } = searchParams;
  // const tags = tag.split("-");
  const tags = tag;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/posts/tags`, {
        method: "POST",
        body: JSON.stringify({
          tags,
        }),
      });

      const data = await response.json();
      console.log(data);
    };
    fetchPosts();
  }, []);

  return <div>page</div>;
};

export default page;

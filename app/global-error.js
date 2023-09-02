"use client";

import { useRouter } from "next/navigation";


const GlobalError = ({
  error,
  reset
}) => {

  const router = useRouter();
  router.push("/");
  return (
    <div>Error</div>
  )
}

export default GlobalError;
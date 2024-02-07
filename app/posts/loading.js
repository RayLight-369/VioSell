import Image from "next/image";

export default function Loading () {
  return (
    <Image
      src={ "/Images/loading.gif" }
      width={ 40 }
      height={ 40 }
      alt="loading"
      unoptimized={ true }
    />
  );
};
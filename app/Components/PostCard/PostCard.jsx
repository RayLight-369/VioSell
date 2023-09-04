"use client";

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation';

import styles from "./PostCard.module.css"; // Import the CSS module

const PostCard = ({ handleTagClick, post, handleEdit, handleDelete }) => {

  const [imageLoading, setImageLoading] = useState(true);
  const [cardLoading, setCardLoading] = useState(true);

  const { data: session } = useSession();

  let { tags } = post;

  tags = tags.split(" ").map(tag => tag.trim());

  useEffect(() => {


    // other operations

    setTimeout(() => {
      setCardLoading(false);
    }, 1000);

  }, [])

  return (
    <div className={ styles['post-card'] } style={ {
      filter: cardLoading ? 'blur(4px)' : "none"
    }}>
      { session?.user?.id == post.userID && (

        <div className={ styles["edit-delete"] }>
          <span className={ styles["edit"] } onClick={ () => {
            handleEdit(post);
          } }>
            Edit
          </span>
          <span className={ styles["delete"] } onClick={ () => {
            handleDelete(post);
          } }>
            Delete
          </span>
        </div>

      )}
      <div className={styles['post-image']}>
          <Image
            src={"/Images/post.jpg"}
            width={240}
            height={150}
            alt='post image'
            // style={ {
            //   filter: imageLoading ? "blur(4px)" : "none",
            // }}
            // onLoadingComplete={() => setImageLoading(false)}
          />
      </div>
      <div className={styles['info']}>
        <div className={styles['time']}>
          <p className={styles['time']}>{post.created_at}</p>
        </div>
        <div className={styles['title-desc']}>
          <p className={styles['title']}>{post.title}</p>
          <p className={styles['desc']}>{post.description}</p>
        </div>
        
        <div className={styles['button']}><button>Read More</button></div>
      </div>
      <div className={styles['tags']}>
        {tags.map((tag, id) => (
          <span className={styles['tag']} key={id}>{tag}</span>
        ))}
      </div>
    </div>
  )
}

export default PostCard;

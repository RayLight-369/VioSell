import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation';

import "../styles/PostCard.css";

const PostCard = ({ handleTagClick, post, handleEdit, handleDelete }) => {

  let { tags } = post;

  tags = tags.split(" ").map(tag => tag.trim());

  return (
    <div className='post-card'>
      {/* <div className="card"> */}
        <div className="post-image">
          <Image
            src={ "/Images/post.jpg" }
            width={ 240 }
            height={ 150 }
            alt='post image'
          />
      </div>
      <div className="info">
        <div className="title-desc">
          <p className="title">{ post.title }</p>
          <p className="desc">{ post.description }</p>
        </div>
        <div className="tags">
          { tags.map((tag, id) => (
            <span className="tag" key={id}>{ tag }</span>
          ))}
        </div>
      </div>
        
        {/* </div> */}
    </div>
  )
}

export default PostCard
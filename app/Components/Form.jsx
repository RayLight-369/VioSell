import React from 'react'
import "../styles/Form.css"
import Link from 'next/link';

const Form = ({ post, type, setPost, submitting, handleSubmit }) => {
  
  let desc = type.toLowerCase() === "edit" ? "Effortlessly refine your posted items. Edit your content to ensure your products are presented at their best, maintaining an enticing display for potential buyers." : "Craft compelling posts showcasing your items for sale. Present your products in an engaging way, inviting others to explore and make a purchase if they find something they desire."

  return (
    <section id="create-post">
      <h1 className={ `title` }>{ type } Post</h1>
      <p className="desc">{ desc }</p>

      <form className='form' onSubmit={handleSubmit}>
        <label className="title">
          <span>Your Title</span>
          <input type="text" required placeholder='Title' onChange={(e) => setPost(prev => ({...prev, title: e.target.value}))} />
        </label>

        <label className="description">
          <span>Description</span>
          <textarea required placeholder='Write Description...' onChange={(e) => setPost(prev => ({...prev, description: e.target.value}))} />
        </label>

        <label className="tags">
          <span>Tags <span>e.g. (#mobile, #laptop)</span></span>
          <input required type="text" placeholder='tag' onChange={(e) => setPost(prev => ({...prev, tags: e.target.value}))} />
        </label>

        <div className="submit">
          <Link href={ "/" }>Cancel</Link>

          <button type="submit" disabled={submitting}>
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form
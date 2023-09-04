import React from 'react'
import styles from "./Form.module.css"
import Link from 'next/link';

const Form = ({ post, type, setPost, submitting, handleSubmit }) => {
  
  let desc = type.toLowerCase() === "edit" ? "Effortlessly refine your posted items. Edit your content to ensure your products are presented at their best, maintaining an enticing display for potential buyers." : "Craft compelling posts showcasing your items for sale. Present your products in an engaging way, inviting others to explore and make a purchase if they find something they desire."


  return (
    <section id={ styles['create-post'] }>
      
      <h1 className={ styles['title'] }>{ type } Post</h1>
      <p className={styles["desc"]}>{ desc }</p>

      <form className={ styles['form'] } onSubmit={ handleSubmit }>
        
        <label className={ styles["label"] }>
          
          <span className={styles['span']}>Your Title</span>
          <input type="text" required placeholder='Title' value={ post.title } onChange={ (e) => setPost(prev => ({ ...prev, title: e.target.value })) } />
          
        </label>

        <label className={ styles["label"] }>
          
          <span className={styles['span']}>Description</span>
          <textarea className={ styles['textarea'] } value={ post.description } required placeholder='Write Description...' onChange={ (e) => setPost(prev => ({ ...prev, description: e.target.value })) } />
          
        </label>

        <label className={ styles["label"] }>
          
          <span className={`${styles['span']}`}>Tags <span className={styles['child']}>e.g. (#mobile, #laptop)</span></span>
          <input required type="text" placeholder='tag' value={post.tags} onChange={(e) => setPost(prev => ({...prev, tags: e.target.value}))} />
        
        </label>

        <label className={ styles["label"] }>

          <span className={ styles["span"] }>Location</span>
          <input type="text" required placeholder='Location' value={ post.location } onChange={ (e) => setPost(prev => ({ ...prev, location: e.target.value })) } />

        </label>

        <div className={ styles["submit-container"] }>
          
          <Link href={ "/" } className={styles['link']}>Cancel</Link>

          <button type="submit" className={styles['submit-button']} disabled={submitting}>
            {submitting ? `${type}...` : type}
          </button>

        </div>
      </form>
    </section>
  )
}

export default Form;
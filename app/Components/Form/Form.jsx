"use client";

import React, { useEffect, useState } from "react";
import styles from "./Form.module.css";
import Link from "next/link";
import Image from "next/image";
import { v4 as uid } from "uuid";
import { deleteData, deleteFile, uploadFile } from "@/app/Supabase/Supabase";
import { getSession, useSession } from "next-auth/react";

const Form = ( { post, type, setPost, submitting, handleSubmit } ) => {
  let desc =
    type.toLowerCase() === "edit"
      ? "Effortlessly refine your posted items. Edit your content to ensure your products are presented at their best, maintaining an enticing display for potential buyers."
      : "Craft compelling posts showcasing your items for sale. Present your products in an engaging way, inviting others to explore and make a purchase if they find something they desire.";

  let IMG_OBJECT =
    type.toLowerCase().trim() == "edit"
      ? [ ...post.images ].reduce( ( p, c ) => {
        p[ c ] = c;
        return p;
      }, {} )
      : {};

  const [ images, setImages ] = useState( IMG_OBJECT );
  const { data: session } = useSession();

  useEffect( () => {
    if ( type.toLowerCase().trim() == "edit" ) {
      setImages( {
        ...[ ...post.images ].reduce( ( p, c ) => {
          p[ c ] = c;
          return p;
        }, {} ),
      } );
    }
  }, [ session, images ] );

  console.log( "this is images object: ", images );

  function deleteEntry ( obj, indexToDelete ) {
    const keys = Object.keys( obj );

    if ( indexToDelete < 0 || indexToDelete >= keys.length ) {
      return obj; // Index out of range, return the original object
    }

    const updatedObj = { ...obj };
    const keyToDelete = keys[ indexToDelete ];
    delete updatedObj[ keyToDelete ];

    return updatedObj;
  }

  const handleFileChange = ( e ) => {
    let files = e.target.files;

    for ( let file of files ) {
      setImages( ( prev ) => ( {
        ...prev,
        [ URL.createObjectURL( file ) ]: file,
      } ) );
    }
  };

  const handleDelete = ( e, key ) => {
    e.preventDefault();
    e.stopPropagation();

    let updatedImages = deleteEntry( images, key );

    setImages( { ...updatedImages } );
  };

  return (
    <section id={ styles[ "create-post" ] }>
      <h1 className={ styles[ "title" ] }>{ type } Post</h1>
      <p className={ styles[ "desc" ] }>{ desc }</p>

      <form
        className={ styles[ "form" ] }
        onSubmit={ ( e ) => {
          handleSubmit( e, images, post );
        } }
      >
        <label className={ styles[ "label" ] }>
          <span className={ styles[ "span" ] }>Your Title</span>
          <input
            type="text"
            required
            placeholder="Title"
            value={ post.title }
            onChange={ ( e ) =>
              setPost( ( prev ) => ( { ...prev, title: e.target.value } ) )
            }
          />
        </label>

        <label className={ styles[ "label" ] }>
          <span className={ styles[ "span" ] }>Price</span>
          <input
            type="number"
            required
            placeholder="Price"
            value={ post.price }
            onChange={ ( e ) =>
              setPost( ( prev ) => ( { ...prev, price: +e.target.value } ) )
            }
          />
        </label>

        <label className={ styles[ "label" ] }>
          <span className={ styles[ "span" ] }>Contact</span>
          <input
            type="text"
            required
            placeholder="Contact"
            value={ post.contact }
            onChange={ ( e ) =>
              setPost( ( prev ) => ( { ...prev, contact: e.target.value } ) )
            }
          />
        </label>

        <label className={ styles[ "label" ] }>
          <span className={ styles[ "span" ] }>Description</span>
          <textarea
            className={ styles[ "textarea" ] }
            value={ post.description }
            required
            placeholder="Write Description..."
            onChange={ ( e ) =>
              setPost( ( prev ) => ( { ...prev, description: e.target.value } ) )
            }
          />
        </label>

        <label className={ styles[ "label" ] }>
          <span className={ `${ styles[ "span" ] }` }>
            Tags{ " " }
            <span className={ styles[ "child" ] }>e.g. (#mobile, #laptop)</span>
          </span>
          <input
            required
            type="text"
            placeholder="tag"
            value={ post.tags }
            onChange={ ( e ) =>
              setPost( ( prev ) => ( { ...prev, tags: e.target.value } ) )
            }
          />
        </label>

        <label className={ styles[ "label" ] }>
          <span className={ styles[ "span" ] }>Location</span>
          <input
            type="text"
            required
            placeholder="Location"
            value={ post.location }
            onChange={ ( e ) =>
              setPost( ( prev ) => ( { ...prev, location: e.target.value } ) )
            }
          />
        </label>

        {/* <div className="image-section"> */ }

        <label htmlFor="file" className={ styles[ "image-label" ] }>
          Select Images
        </label>
        <input
          type="file"
          onChange={ handleFileChange }
          multiple
          name="file"
          id="file"
          min={ 1 }
          max={ 9 }
          accept="image/*"
          style={ { display: "none" } }
        />

        {/* </div> */ }

        <div className={ styles[ "img-container" ] }>
          { Object.keys( images ).map( ( img, key, arr ) => (
            <div className={ styles[ "img-box" ] } key={ key }>
              <Image
                src={ img }
                width={ 200 }
                height={ 200 }
                alt="ad image"
                className={ styles[ "img" ] }
              />

              <button
                className={ styles[ "delete-img" ] }
                onClick={ ( e ) => handleDelete( e, key ) }
              >
                x
              </button>
            </div>
          ) ) }
        </div>

        <div className={ styles[ "submit-container" ] }>
          <Link href={ "/" } className={ styles[ "link" ] }>
            Cancel
          </Link>

          <button
            type="submit"
            className={ styles[ "submit-button" ] }
            disabled={ submitting }
          >
            { submitting ? `${ type }...` : type }
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;

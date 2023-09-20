"use client";

import Image from "next/image";

import styles from "./ImageComponent.module.css";
import { useEffect, useRef, useState } from "react";
import { v4 as uid } from "uuid";
import Swipeable from "react-swipeable";

const ImageComponent = ( {
  images = [],
  padding = 0,
  style = { top: 0, left: 0 },
  width = 550,
  height = 480,
  className,
} ) => {
  let [ numberOfImages, setNumberOfImages ] = useState( 0 );
  let [ pictures, setPictures ] = useState( images?.length ? [ ...images ] : [] );
  const [ current, setCurrent ] = useState( 0 );
  const [ imageLoading, setLoading ] = useState( true );
  const [ previewVisible, setPreviewVisible ] = useState( false );

  const previewContainer = useRef();

  useEffect( () => {
    setNumberOfImages( images.length );
    setPictures( images );
    console.log( "images array: ", images );
  }, [ images ] );

  const next = ( e ) => {
    setCurrent( ( prev ) => ( prev == numberOfImages - 1 ? 0 : prev + 1 ) );
  };

  const previous = ( e ) => {
    setCurrent( ( prev ) => ( prev == 0 ? numberOfImages - 1 : prev - 1 ) );
  };

  const setSlide = ( i ) => {
    setCurrent( i );
  };

  useEffect( () => {
    if ( previewVisible ) {
      previewContainer.current.style.top = "0";
      previewContainer.current.style.zIndex = 10000;
      previewContainer.current.style.transform = "rotateX(0deg)";
    } else {
      previewContainer.current.style.top = "100%";
      previewContainer.current.style.zIndex = 0;
    }
  }, [ previewVisible ] );

  const handleImageClick = ( e ) => {
    let src = e.target.src;

    if ( !src ) return;

    setPreviewVisible( true );

    // preview.current.src = src;
    // previewContainer.current.style.top = "0";
    // preview.current.style.transform = "translate(-50%, -50%) rotateX(0deg)";
    // overlay.style.display = "block"
  };

  // smooth
  return (
    <>
      <div className={ styles[ "preview-container" ] } ref={ previewContainer }>
        <button
          type="button"
          className={ styles[ "close" ] }
          onClick={ () => setPreviewVisible( false ) }
        >
          &times;
        </button>
        <div
          className={ styles[ "preview-image-container" ] }
          style={ {
            left: `calc(-${ current * 100 }% - ${ padding * current }px)`,
            width: `calc(${ pictures.length * 100 }% + ${ padding * ( pictures.length - 1 )
              }px)`,
          } }
        >
          { " " }
          {/* padding is the padding of css */ }
          { pictures.map( ( image, i ) => (
            <div className={ styles[ "preview-img" ] } key={ i }>
              <Image
                src={ image }
                width={ 530 }
                height={ 460 }
                alt="post Image"
                onLoadingComplete={ () => setLoading( false ) }
                style={ {
                  filter: imageLoading ? "blur(5px)" : "none",
                } }
                onClick={ handleImageClick }
                key={ image }
              />
            </div>
          ) ) }
        </div>

        <div className={ styles[ "preview-labels" ] }>
          { pictures.map( ( _, i ) => (
            <div
              className={ styles[ "preview-label" ] }
              key={ i }
              style={ {
                width: current == i ? 24 : 8,
              } }
              onClick={ () => setSlide( i ) }
            ></div>
          ) ) }
        </div>

        <button className={ styles[ "preview-previous" ] } onClick={ previous }>
          { "❮" }
        </button>
        <button className={ styles[ "preview-next" ] } onClick={ next }>
          { "❯" }
        </button>
      </div>

      <div
        className={ `${ styles[ "container" ] } ${ className }` }
        style={ { top: style.top, left: style.left, width, height } }
      >
        <div
          className={ styles[ "image-container" ] }
          style={ {
            left: `calc(-${ current * 100 }% - ${ padding * current }px)`,
            width: `calc(${ pictures.length * 100 }% + ${ padding * ( pictures.length - 1 )
              }px)`,
          } }
        >
          { pictures.map( ( image, i ) => (
            <div className={ styles[ "img" ] } key={ i }>
              <Image
                src={ image }
                width={ 530 }
                height={ 460 }
                alt="post Image"
                onLoadingComplete={ () => setLoading( false ) }
                style={ {
                  filter: imageLoading ? "blur(5px)" : "none",
                } }
                onClick={ handleImageClick }
                key={ image }
              />
            </div>
          ) ) }
        </div>

        <div className={ styles[ "labels" ] }>
          { pictures.map( ( _, i ) => (
            <div
              className={ styles[ "label" ] }
              key={ i }
              style={ {
                width: current == i ? 24 : 8,
              } }
              onClick={ () => setSlide( i ) }
            ></div>
          ) ) }
        </div>

        <button className={ styles[ "previous" ] } onClick={ previous }>
          { "❮" }
        </button>
        <button className={ styles[ "next" ] } onClick={ next }>
          { "❯" }
        </button>
      </div>
    </>
  );
};

export default ImageComponent;

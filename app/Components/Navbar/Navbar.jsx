"use client";

import { useState, useEffect } from "react";
import { useSession, signIn, signOut, getProviders } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBarsStaggered } from "@fortawesome/free-solid-svg-icons";

import styles from "./Navbar.module.css"; // Import the CSS module

const Navbar = () => {
  const [ provider, setProvider ] = useState( null );
  const { data: session, status } = useSession();
  const [ toggleDropdown, setToggleDropdown ] = useState( false );
  const [ isMobile, setIsMobile ] = useState( true );
  const [ icon, setIcon ] = useState( faBars );

  useEffect( () => {
    const setProviders = async () => {
      const response = await getProviders();
      setProvider( response );
    };
    setProviders();

    const handleResize = () => setIsMobile( window.innerWidth <= 767 );

    handleResize(); // Check on initial render
    window.addEventListener( "resize", handleResize );

    if ( toggleDropdown ) setIcon( faBarsStaggered );

    return () => {
      window.removeEventListener( "resize", handleResize );
    };
  }, [] );

  const hideDropdown = () => {
    setToggleDropdown( false );
    setIcon( faBars );
  };

  let navContent;

  if ( isMobile ) {
    navContent = (
      <div className={ styles[ "menu-bar" ] }>
        <div className={ styles[ "bars" ] }>
          <FontAwesomeIcon
            icon={ icon }
            onClick={ () =>
              setToggleDropdown( ( prev ) => {
                if ( !prev ) setIcon( faBarsStaggered );
                else setIcon( faBars );
                return !prev;
              } )
            }
            style={ {
              color: "orangered",
            } }
          />
        </div>
        {/* {toggleDropdown && ( */ }
        <div
          className={ `${ styles.dropdown } ${ toggleDropdown ? styles.open : "" }` }
        >
          <div className={ styles[ "links" ] }>
            <Link href={ "/" } onClick={ hideDropdown }>
              Home
            </Link>
            <Link href={ "/posts" } onClick={ hideDropdown }>
              Posts
            </Link>
            <Link href={ "/create-post" } onClick={ hideDropdown }>
              Create Post
            </Link>
            <Link
              href={ `/users/${ session?.user.id }/posts` }
              onClick={ hideDropdown }
            >
              My Posts
            </Link>
            <Link href={ `/users/${ session?.user.id }` } onClick={ hideDropdown }>
              Profile
            </Link>
          </div>
          { session?.user && status != "loading" ? (
            <button
              className={ styles.signout }
              onClick={ () => {
                hideDropdown();
                signOut();
              } }
            >
              Sign-out
            </button>
          ) : status == "loading" ? (
            <p>Loading...</p>
          ) : (
            <button
              className={ styles[ "register-btn" ] }
              onClick={ () => {
                hideDropdown();
                signIn( provider.google.id );
              } }
            >
              Sign-in
            </button>
          ) }
        </div>
        {/* )} */ }
      </div>
    );
  } else {
    navContent = (
      <>
        <div className={ styles.links }>
          <Link href={ "/" }>Home</Link>
          <Link href={ "/posts" }>Posts</Link>
        </div>
        { session?.user && status != "loading" ? (
          <div className={ styles.profile }>
            <div
              className={ styles.img }
              onClick={ () => setToggleDropdown( ( prev ) => !prev ) }
            >
              <Image
                src={ session?.user.image }
                width={ 36 }
                height={ 36 }
                alt="profile picture"
              />
            </div>
            {/* {toggleDropdown && ( */ }
            <div
              className={ `${ styles.dropdown } ${ toggleDropdown ? styles.open : ""
                }` }
            >
              <div className={ styles.links }>
                { isMobile && (
                  <>
                    <Link href={ "/" } onClick={ hideDropdown }>
                      Home
                    </Link>
                    <Link href={ "/posts" } onClick={ hideDropdown }>
                      Posts
                    </Link>
                  </>
                ) }
                <Link href={ `/users/${ session?.user.id }` } onClick={ hideDropdown }>
                  Profile
                </Link>
                <Link href={ "/create-post" } onClick={ hideDropdown }>
                  Create Post
                </Link>
                <Link
                  href={ `/users/${ session?.user.id }/posts` }
                  onClick={ hideDropdown }
                >
                  My Posts
                </Link>
              </div>
              <button
                className={ styles.signout }
                onClick={ () => {
                  signOut();
                  hideDropdown();
                } }
              >
                Sign-Out
              </button>
            </div>
            {/* )} */ }
          </div>
        ) : status != "loading" ? (
          <div className={ styles.register }>
            <button
              className={ styles[ "register-btn" ] }
              onClick={ () => {
                hideDropdown();
                signIn( provider.google.id );
              } }
            >
              Sign-In
            </button>
          </div>
        ) : (
          <p>Loading...</p>
        ) }
      </>
    );
  }

  return (
    <header id={ styles.navbar }>
      <div className={ styles.logo }>
        <Image
          src={ "/Images/favicon.svg" }
          width={ 37 }
          height={ 37 }
          alt="vio logo"
        />
      </div>

      <nav id={ styles.nav }>{ navContent }</nav>
    </header>
  );
};

export default Navbar;

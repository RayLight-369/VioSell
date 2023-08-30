import Link from "next/link";
import Image from "next/image";

import { Quicksand } from "next/font/google";
import { useSession, signIn, signOut, getProviders } from "next-auth/react"
import { useState, useEffect } from "react";

import "../styles/Navbar.css"
// import "../styles/gpt.css"

const quicksand = Quicksand({
  weight: "variable",
  subsets: ["latin"]
})

const Navbar = () => {

  const [provider, setProvider] = useState(null);
  const { data: session, status } = useSession();
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setProviders = async () => {
      const responce = await getProviders();
      setProvider(responce);
    }

    setProviders();
  }, [])


  const hideDropdown = () => {
    setToggleDropdown(false);
  };

  return (
    <header id="navbar" className={quicksand.className}>
      <div className="logo">
        <Image
          src={ "/Images/favicon.svg" }
          width={ 37 }
          height={ 37 }
          alt="vio logo"
        />
      </div>
      <nav id="nav">
        <div className="links">
          
          <Link href={ "/" }>Home</Link>
          <Link href={ "/posts" }>Posts</Link>
          
        </div>
        { session?.user ? (
          <div className="profile">
            <div className="img" onClick={() => setToggleDropdown(prev => !prev)}>
              <Image
                src = { session?.user.image }
                width = { 36 }
                height={ 36 }
                alt="profile picture"
              />
            </div>
            { toggleDropdown && (
              <div className="dropdown">
                <div className="links">
                  <Link href={ "/profile" } onClick={hideDropdown}>Profile</Link>
                  <Link href={ "/create-post" } onClick={hideDropdown}>Create Post</Link>
                  <Link href={ "/my-posts" } onClick={hideDropdown}>My Posts</Link>
                </div>
                <button className="signout" onClick={ () => {

                  signOut();
                  hideDropdown();

                }}>Sign-Out</button>
              </div>
            )}
          </div>
        ): (
            <div className="register">
              <button onClick={() => signIn(provider.google.id)}>Sign-In</button>
            </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar
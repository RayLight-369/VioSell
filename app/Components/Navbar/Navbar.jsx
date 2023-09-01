"use client";

import { useSession, signIn, signOut, getProviders } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
// import { Quicksand } from "next/font/google";
import { useState, useEffect } from "react";

import styles from "./Navbar.module.css"; // Import the CSS module

// const quicksand = Quicksand({
//   weight: "variable",
//   subsets: ["latin"],
// });

const Navbar = () => {
  const [provider, setProvider] = useState(null);
  const { data: session, status } = useSession();
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();
      setProvider(response);
    };

    setProviders();
  }, []);

  const hideDropdown = () => {
    setToggleDropdown(false);
  };

  return (
    <header id={styles.navbar}>
      <div className={styles.logo}>
        <Image
          src={"/Images/favicon.svg"}
          width={37}
          height={37}
          alt="vio logo"
        />
      </div>
      <nav id={styles.nav}>
        <div className={styles.links}>
          <Link href={"/"}>Home</Link>
          <Link href={"/posts"}>Posts</Link>
        </div>
        {session?.user ? (
          <div className={styles.profile}>
            <div
              className={styles.img}
              onClick={() => setToggleDropdown((prev) => !prev)}
            >
              <Image
                src={session?.user.image}
                width={36}
                height={36}
                alt="profile picture"
              />
            </div>
            {toggleDropdown && (
              <div className={styles.dropdown}>
                <div className={styles.links}>
                  <Link href={"/profile"} onClick={hideDropdown}>
                    Profile
                  </Link>
                  <Link href={"/create-post"} onClick={hideDropdown}>
                    Create Post
                  </Link>
                  <Link href={"/my-posts"} onClick={hideDropdown}>
                    My Posts
                  </Link>
                </div>
                <button
                  className={styles.signout}
                  onClick={() => {
                    signOut();
                    hideDropdown();
                  }}
                >
                  Sign-Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.register}>
            <button onClick={() => signIn(provider.google.id)}>Sign-In</button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

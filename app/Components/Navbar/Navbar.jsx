"use client";

import { useState, useEffect } from "react";
import { useSession, signIn, signOut, getProviders } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css"; // Import the CSS module
import Loading from "@/app/loading";

const Navbar = () => {
  const [provider, setProvider] = useState(null);
  const { data: session, status } = useSession();
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [icon, setIcon] = useState(faBars);
  const pathName = usePathname();

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();
      setProvider(response);
    };
    setProviders();

    const handleResize = () => setIsMobile(window.innerWidth <= 767);

    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);

    if (toggleDropdown) setIcon(faBarsStaggered);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const hideDropdown = () => {
    setToggleDropdown(false);
    setIcon(faBars);
  };

  let navContent;

  useEffect(() => {
    const event = (e) => {
      let pfp = document.querySelector(`div.${styles.img}`);
      let bars = document.querySelector(`div.${styles.bars}`);

      if (pfp && !pfp.contains(e.target)) {
        setToggleDropdown(false);
      }

      if (bars && !bars.contains(e.target)) {
        setToggleDropdown(false);
      }
    };

    const updateHeader = (element, height, bg, filter, padding) => {
      element.style.height = height;
      element.style.background = bg;
      element.style.backdropFilter = filter;
      element.style.padding = padding;
    };

    const handleScroll = () => {
      const scrollY = document.documentElement.scrollTop;
      const offsetY = 300;
      const header = document.querySelector("header");

      if (scrollY >= offsetY) {
        updateHeader(
          header,
          `50px`,
          `rgba(255, 255, 255, 0.733)`,
          `blur(5px)`,
          `9px 12px`
        );
      } else {
        updateHeader(
          header,
          `70px`,
          `rgba(255, 255, 255)`,
          `none`,
          `12px 15px`
        );
      }
    };

    document.addEventListener("scroll", handleScroll);
    document.addEventListener("click", event);

    return () => {
      document.removeEventListener("click", event);
      // document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const setActiveLink = (path) =>
    pathName === path ? styles.active : undefined;

  if (isMobile) {
    navContent = (
      <div className={styles["menu-bar"]}>
        <div className={styles["bars"]}>
          <FontAwesomeIcon
            icon={icon}
            onClick={() =>
              setToggleDropdown((prev) => {
                if (!prev) setIcon(faBarsStaggered);
                else setIcon(faBars);
                return !prev;
              })
            }
            style={{
              color: "orangered",
            }}
          />
        </div>
        {/* {toggleDropdown && ( */}
        <div
          className={`${styles.dropdown} ${toggleDropdown ? styles.open : ""}`}
        >
          <div className={styles["links"]}>
            <Link
              href={"/"}
              // onClick={hideDropdown}
              className={setActiveLink("/")}
            >
              Home
            </Link>
            <Link
              href={"/posts"}
              // onClick={hideDropdown}
              className={setActiveLink("/posts")}
            >
              Posts
            </Link>
            {session?.user && status != "loading" && (
              <>
                <Link
                  href={"/create-post"}
                  className={setActiveLink("/create-post")}
                  // onClick={hideDropdown}
                >
                  Create Post
                </Link>
                <Link
                  href={`/users/${session?.user.id}/posts`}
                  className={setActiveLink(`/users/${session?.user.id}/posts`)}
                  // onClick={hideDropdown}
                >
                  My Posts
                </Link>
                <Link
                  href={`/users/${session?.user.id}`}
                  className={setActiveLink(`/users/${session?.user.id}`)}
                  // onClick={hideDropdown}
                >
                  Profile
                </Link>
              </>
            )}
          </div>
          {session?.user && status != "loading" ? (
            <button
              className={styles.signout}
              onClick={() => {
                // hideDropdown();
                signOut();
              }}
            >
              Sign-out
            </button>
          ) : status == "loading" ? (
            <p>Loading...</p>
          ) : (
            <button
              className={styles["register-btn"]}
              onClick={() => {
                // hideDropdown();
                signIn(provider.google.id);
              }}
            >
              Sign-in
            </button>
          )}
        </div>
        {/* )} */}
      </div>
    );
  } else {
    navContent = (
      <>
        <div className={styles.links}>
          <Link href={"/"} className={setActiveLink("/")}>
            Home
          </Link>
          <Link href={"/posts"} className={setActiveLink("/posts")}>
            Posts
          </Link>
        </div>
        {session?.user && status != "loading" ? (
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
            {/* {toggleDropdown && ( */}
            <div
              className={`${styles.dropdown} ${
                toggleDropdown ? styles.open : ""
              }`}
            >
              <div className={styles.links}>
                <Link
                  href={`/users/${session?.user.id}`}
                  className={setActiveLink(`/users/${session?.user.id}`)}
                  // onClick={hideDropdown}
                >
                  Profile
                </Link>
                <Link
                  href={"/create-post"}
                  className={setActiveLink(`/create-post`)}
                  // onClick={ hideDropdown }
                >
                  Create Post
                </Link>
                <Link
                  href={`/users/${session?.user.id}/posts`}
                  className={setActiveLink(`/users/${session?.user.id}/posts`)}
                  // onClick={hideDropdown}
                >
                  My Posts
                </Link>
              </div>
              <button
                className={styles.signout}
                onClick={() => {
                  signOut();
                  // hideDropdown();
                }}
              >
                Sign-Out
              </button>
            </div>
            {/* )} */}
          </div>
        ) : status != "loading" ? (
          <div className={styles.register}>
            <button
              className={styles["register-btn"]}
              onClick={(e) => {
                // hideDropdown();
                signIn(provider.google.id);
              }}
            >
              Sign-In
            </button>
          </div>
        ) : (
          <Loading />
        )}
      </>
    );
  }

  return (
    <header id={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          <Image
            src={"/Images/favicon.svg"}
            width={37}
            height={37}
            alt="vio logo"
            // onClick={() => {
            //   router.push("/");
            // }}
          />
        </Link>
      </div>

      <nav id={styles.nav}>{navContent}</nav>
    </header>
  );
};

export default Navbar;

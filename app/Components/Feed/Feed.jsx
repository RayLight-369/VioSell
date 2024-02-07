"use client";

import React, { useEffect, useState, useMemo } from "react";
import PostCard from "../PostCard/PostCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteAllFiles, deleteFile } from "@/app/Supabase/Supabase";

import styles from "./Feed.module.css";
import Loading from "@/app/loading";

const PostCardList = ({ data, setPosts }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleEdit = (post) => {
    if (session?.user.id === post.userID) {
      router.push(`/edit-post/${post.id}`);
    }
  };

  const handlePostClick = (post) => {
    router.push(`/posts/${post.id}`);
  };

  const handleTagClick = (tags) => {
    router.push(`/posts/tags?tag=${tags.join("-")}`);
  };

  const handleDelete = (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this Post?");

    if (hasConfirmed) {
      fetch(`/api/posts/${post.id}`, {
        method: "DELETE",
      })
        .then(async () => {
          setPosts((prev) => [...prev.filter((p) => p.id != post.id)]);
          await deleteAllFiles(`users/${session?.user.id}/${post.id}`);
        })
        .then(() => router.refresh())
        .catch((error) => console.error("Error deleting post:", error));
    }
  };

  return (
    <div id={styles["posts-list"]}>
      {data.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          handlePostClick={handlePostClick}
          handleTagClick={handleTagClick}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      ))}
    </div>
  );
};

const Feed = ({
  className,
  range,
  type,
  user_ID,
  searchBar = false,
  data,
  query,
  setQuery,
  handleSearch,
  newPostsWhileScrolling = false,
}) => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [pause, setPause] = useState(false);
  const [lastIndex, setLastIndex] = useState(0);
  const [pendingPosts, setPendingPosts] = useState(0);
  const [AppliedFilter, setAppliedFilter] = useState("");

  const fetchPosts = async (Range, filter, firstTimeFilters, query) => {
    if (lastIndex <= 0) {
      setLoading(true);
    }
    setError(null);
    setPause(true);

    try {
      let url = user_ID ? `/api/users/${user_ID}/posts` : `/api/posts`;
      // const response = await fetch( `${ url }${ range?.length > 0 ? "?range=" + range[ 0 ] + "_to_" + range[ 1 ] : "" }` );

      let obj = {};

      if (Range?.length) {
        obj.range = Range;
      } else if (range?.length) {
        obj.range = range;
      }

      if (filter) {
        obj.filter = filter;
      }

      if (query) {
        url += "/search";
        obj.query = query;
      }

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(obj),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let Data = await response.json();

      if (Data?.data?.length) Data = Data.data;

      setPendingPosts(Data.remaining);

      let newPosts = [];

      if (firstTimeFilters) {
        newPosts = [...Data];
      } else {
        newPosts = [...posts, ...Data];
      }

      setPosts([...newPosts]);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("An error occurred while fetching posts.");
      // fetchPosts()
    } finally {
      setLoading(false);
      setPause(false);
    }
  };

  useEffect(() => {
    setLastIndex(posts.length);
    console.log(posts?.map((i) => i.id));
  }, [posts]);

  useEffect(() => {
    if (!data) {
      fetchPosts();
    } else {
      setPosts(data);
    }
  }, [user_ID, searchBar, data]);

  const handleFilterToggle = () => {
    setFilterOpen((prev) => !prev);
  };

  const filters = useMemo(
    () => [
      {
        name: "Relevant",
        click: () => {
          if (AppliedFilter != "relevance") {
            setLastIndex(0);
            // let filteredPosts = posts.sort( ( a, b ) => ( new Date( a.created_at.split( "-" ).reverse().join( "-" ) ) ) - ( new Date( b.created_at.split( "-" ).reverse().join( "-" ) ) ) );
            setAppliedFilter("relevance");

            fetchPosts(
              [0, 19],
              "relevance",
              true,
              query.length ? query : undefined
            );
            // setPosts( [ ...filteredPosts ] );
          }
        },
      },
      {
        name: "Oldest first",
        click: () => {
          if (AppliedFilter != "oldest") {
            setLastIndex(0);
            // let filteredPosts = posts.sort( ( a, b ) => ( new Date( a.created_at.split( "-" ).reverse().join( "-" ) ) ) - ( new Date( b.created_at.split( "-" ).reverse().join( "-" ) ) ) );
            setAppliedFilter("oldest");

            fetchPosts(
              [0, 19],
              "oldest",
              true,
              query.length ? query : undefined
            );
            // setPosts( [ ...filteredPosts ] );
          }
        },
      },
      {
        name: "Newest first",
        click: () => {
          if (AppliedFilter != "newest") {
            setLastIndex(0);
            // let filteredPosts = posts.sort( ( a, b ) => ( new Date( b.created_at.split( "-" ).reverse().join( "-" ) ) ) - ( new Date( a.created_at.split( "-" ).reverse().join( "-" ) ) ) );
            setAppliedFilter("newest");

            fetchPosts(
              [0, 19],
              "newest",
              true,
              query.length ? query : undefined
            );
            // setPosts( [ ...filteredPosts ] );
          }
        },
      },
    ],
    [posts, AppliedFilter, query]
  );

  const content = useMemo(() => {
    if (loading) {
      return <Loading />;
    } else if (error) {
      return <p>{error}</p>;
    } else if (posts.length === 0) {
      if (!user_ID) {
        return <Loading />;
      } else {
        return <p>User has no posts.</p>;
      }
    } else {
      return (
        <>
          <PostCardList
            setPosts={setPosts}
            data={posts}
            handleTagClick={() => {}}
          />
          {pendingPosts > 0 && newPostsWhileScrolling && (
            <button
              type="button"
              className={styles["load-btn"]}
              onClick={(e) => {
                if (newPostsWhileScrolling && !pause) {
                  fetchPosts(
                    [lastIndex, lastIndex + 19],
                    AppliedFilter,
                    false,
                    query.length ? query : undefined
                  );
                  setPause(true);
                }
              }}
            >
              Load More
            </button>
          )}
        </>
      );
    }
  }, [loading, error, user_ID, posts, data]);

  return (
    // <MotionController className={ styles[ "motion" ] }>
    <section id={styles.feed} className={className}>
      {searchBar && (
        <form
          className={
            !filterOpen
              ? `${styles["form"]}`
              : `${styles["form"]} ${styles["active"]}`
          }
          onSubmit={(e) => e.preventDefault()}
        >
          <div className={styles["search-section"]}>
            <input
              type="text"
              placeholder="Search Post"
              className={styles["search-input"]}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                setLastIndex(0);
                handleSearch(e, [0, 19], AppliedFilter);
              }}
            />
            <button
              onClick={handleFilterToggle}
              className={
                !filterOpen
                  ? `${styles["filter"]}`
                  : `${styles["filter"]} ${styles["active"]}`
              }
              type="button"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
          <div
            className={
              filterOpen
                ? `${styles["filter-section"]}`
                : `${styles["filter-section"]} ${styles["active"]}`
            }
          >
            <div className={styles["filter-options"]}>
              {filters.map((filter, key) => (
                <button key={key} onClick={filter.click}>
                  {filter.name}
                </button>
              ))}
            </div>
          </div>
        </form>
      )}
      {content}
    </section>
    // </MotionController >
  );
};

export default Feed;

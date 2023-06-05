'use client'

import { useState, useEffect } from "react"

import PromptCard from "./PromptCard"

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post, index) => (
        <>

          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        </>
      ))}

    </div>
  )
}


const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const handelSearchTextChange = (e) => {

  }

  useEffect(() => {

    const fetchData = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
      // console.log(data);
    };
    fetchData();
  }, [])
  return (
    <>

      <section className="feed">
        <form className="relative w-full flex-center">
          <input
            type="text"
            placeholder="Search for a tag or a User"
            value={searchText}
            onChange={handelSearchTextChange}
            className="search_input peer"
          />

        </form>

        <PromptCardList
          data={posts}
          handleTagClick={() => {

          }}
        />

      </section>
    </>
  )
}

export default Feed
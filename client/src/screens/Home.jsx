import React, { useState } from 'react'

import Posts from '../components/Posts'
import FeaturedPostCard from '../components/FeaturedPostCard'
import PostCard from '../components/PostCard'

import './Home.css'

export default function Home (props) {
  
  const { posts, tags, categories, users, postsIndex, setPostsIndex } = props

  const totalPosts = posts.length

  const handlePostIndex = (shuffleDirection) => {
    if (shuffleDirection === "previous") {
      setPostsIndex(postsIndex + 5)
    } else if (shuffleDirection === "next") {
      setPostsIndex(postsIndex - 5)
    }
  }

  const FEATUREDPOSTCARDSJSX = posts && posts?.slice(postsIndex, postsIndex + 5).map((post) => {
    
    return(
      <FeaturedPostCard postData = { post } users={users} key={post.id} />
  )})

  // const POSTCARDSJSX = posts & posts?.slice(5).map((post, index) => {
  //   return (
  //     <PostCard postData={post} users={users} key={post.id} index={index} />
  //   )
  // })

  return (

    <>
      
      {posts && posts.length > 0 ?
      
        <div className="home-container">

          {FEATUREDPOSTCARDSJSX}

          {/* <div className="buttons-container">

            {postsIndex === 0 ?
            
              <div className="home-button" id="inactive-button"></div>

              :

              <div className="next-button" id="next-button" onClick={(e) => handlePostIndex("next")} >RECENT POSTS</div>
          
            }

            {(totalPosts - postsIndex > 5) ?
            
              <div className="home-button" id="previous-button" onClick={(e) => handlePostIndex("previous")} >PREVIOUS POSTS</div>

            :

              <div className="home-button" id="inactive-button"></div>
          
            }
          
          </div> */}

          {/* {POSTCARDSJSX} */}

          <Posts tags={tags} users={users} categories={categories} />

        </div>
        
        :
        
        <div className="home-container"></div>
      
      }

    </>
  )
}
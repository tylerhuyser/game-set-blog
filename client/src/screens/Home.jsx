import React, {useState} from 'react'

import Posts from '../components/Posts'
import PostCard from '../components/PostCard'

import './Home.css'

export default function Home (props) {
  
  const { posts, tags, categories, users, postsIndex, setPostsIndex } = props

  const totalPosts = posts.length

  console.log(posts)

  const handlePostIndex = (shuffleDirection) => {
    if (shuffleDirection === "previous") {
      setPostsIndex(postsIndex + 5)
    } else if (shuffleDirection === "next") {
      setPostsIndex(postsIndex - 5)
    }
  }

  const POSTCARDSJSX = posts && posts?.slice(postsIndex, postsIndex + 5).map((post) => {
    
    return(
      < PostCard postData = { post } users={users} />
  )})

  return (

    <>
      
      {posts ?
      
        <div className="home-container">

          {POSTCARDSJSX}

          <div className="buttons-container">

            {postsIndex === 0 ?
            
              <div className="home-button" id="inactive-button"></div>

              :

              <div className="home-button" id="previous-button" onClick={(e) => handlePostIndex("previous")} >PREVIOUS POSTS</div>
            
            }

            {postsIndex - totalPosts >= 5 ?
            
              <div className="home-button" id="inactive-button"></div>

              :

              <div className="next-button" id="next-button" onClick={(e) => handlePostIndex("next")} >RECENT POSTS</div>
          
            }
          
          </div>

        </div>
        
        :
        
        <></>
      
      }

    </>
  )
}
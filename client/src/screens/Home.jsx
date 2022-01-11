import React from 'react'

import FeaturedPostCard from '../components/FeaturedPostCard'
import Posts from '../components/Posts'

import './Home.css'

export default function Home (props) {
  
  const { posts, tags, categories, users } = props

  const FEATUREDPOSTCARDSJSX = posts && posts?.slice(0, 5).map((post) => {
    
    return(
      <FeaturedPostCard postData = { post } users={users} key={post.id} />
  )})

  return (

    <>
      
      {posts && posts.length > 0 ?
      
        <div className="home-container">

          {FEATUREDPOSTCARDSJSX}

          <Posts tags={tags} users={users} categories={categories} />

        </div>
        
        :
        
        <div className="home-container"></div>
      
      }

    </>
  )
}